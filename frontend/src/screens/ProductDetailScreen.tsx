import { useState, useEffect }                from "react";
import { useParams, useNavigate, Link }       from 'react-router-dom'
import { useDispatch, useSelector }           from "react-redux";
import { skipToken }                          from '@reduxjs/toolkit/query/react'
import { useGetProductDetailsQuery,
    useGetProductReviewsQuery,
    useGetProductReviewByUserQuery,
    useReviewProductMutation }                from "../slices/productsApiSlice";
import { addToCart }                          from "../slices/cartSlice";
import { increaseQty, decreaseQty, clampQty } from "../utils/quantity.ts";
import { toast }                              from "react-toastify";

// COMPONENTS
import Rating    from "../components/Rating";
import Loader    from "../components/Loader";
import Message   from "../components/Message";
import QtyPicker from "../components/QtyPicker";
import Meta      from "../components/Meta";

import type { Product, Review, AddReview }   from "../types.ts";
import type { RootState } from "../store";

interface ApiError {
    message: string;
}

const ProductDetailScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector( ( state: RootState ) => state.auth );

    const { id: productId } = useParams();

    const { data: product, isLoading, error }                  = useGetProductDetailsQuery( productId ?? skipToken );
    const { data: reviews, isLoading: loadingReviews }         = useGetProductReviewsQuery( productId ?? skipToken );
    const { data: userReview, isLoading: loadingUserReview }   = useGetProductReviewByUserQuery( productId && userInfo?._id ? { product: productId, user: userInfo._id } : skipToken );
    const [ createReview, { isLoading: loadingCreateReview } ] = useReviewProductMutation();

    // Do this to check whether the current user has a review submitted
    const hasReviewed = !!userReview;

    const [ qty, setQty ]               = useState(1);
    const [ qtyMessage, setQtyMessage ] = useState("");
    const [ rating, setRating ]         = useState(0);
    const [ title, setTitle ]           = useState("");
    const [ comment, setComment ]       = useState("");


    // modify quantity and check against availability
    function availableQty() {
        return product ? product.countInStock : 0;
    }

    function changeQty ( requested: number ) {
        const available:number = availableQty();

        setQty( clampQty( requested, available ) );

        if ( requested <= available ) setQtyMessage('');
    }

    /**
     * quantity message alert if selected qty is equal to or greater than availability
     */
    useEffect( () => {
        const available: number = availableQty();

        if ( qty >= available && available > 0 ) {
            setQtyMessage(`Only ${available} left in stock.`);
        }
        else {
            setQtyMessage('');
        }
    }, [qty, product]);

    /**
     * Set item quantity to what is in the cart
      */
    const cartItems = useSelector( ( state: RootState ) => state.cart.cartItems);

    useEffect( () => {
        const existingItem = cartItems.find( ( item: Product ) => item._id === productId);

        setQty( existingItem ? existingItem.qty : 1 );
    }, [ productId, cartItems ])

    const addToCartHandler = () => {
        dispatch( addToCart( {
            ...product,
            qty
        } ) );
        navigate( "/cart" );
    }
    
    const submitReviewHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if ( !productId ) {
            return toast.error('Product ID is missing.');
        }
        console.log( userInfo._id );

        const addReview: AddReview = {
            product: productId,
            user: userInfo._id,
            title,
            rating,
            comment
        }

        try {
            await createReview( addReview );
            toast.success("Your review has been added successfully.");
        }
        catch {
            toast.error('There was an error adding your review.');
        }
    }

    return (
        <>
            <div className="text-right mb-8">
                <Link to={'/'}
                      className={`py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white uppercase text-sm font-semibold rounded`}>Back</Link>
            </div>
            {
                isLoading ? (
                        <Loader />
                    )
                    : error ? (
                            <Message variant="error">
                                     {'data' in error
                                        ? (error.data as ApiError)?.message
                                        : 'message' in error
                                            ? error.message
                                            : 'An error occurred.'
                                    }
                            </Message>
                        )
                        : (
                            <>
                                { product
                                    ? <>
                                        <Meta title={ `${ product.name } | TechStash` } />
                                        <div className="sm:flex sm:gap-8">
                                            <div className={`sm:w-1/2 mb-4 sm:mb-0`}>
                                                <img src={product.image} alt={product.name} className={`w-full rounded-md`}/>
                                            </div>
                                            <div className={`sm:w-1/2`}>
                                                <h1 className={`text-3xl font-bold mb-2`}>{product.name}</h1>
                                                <div className={`mb-2`}>
                                                    <Rating value={product.rating} text={product.numReviews}/>
                                                </div>
                                                <div className="flex gap-4 items-center mb-4">
                                                    <div
                                                        className={`text-4xl font-semibold text-blue-500 leading-tight ${product.countInStock === 0 && 'line-through'}`}>
                                                        ${product.price}

                                                    </div>
                                                    {product.countInStock < 10 && product.countInStock > 0
                                                        && <span
                                                            className="text-red-600 ml-2 inline-block">Only {product.countInStock} left in stock!</span>
                                                    }
                                                </div>
                                                <p className={`mb-4`}>{product.description}</p>
                                                <div className="flex gap-4 mb-4">
                                                    <QtyPicker product={product}
                                                               qty={ qty }
                                                               addQty={ () => setQty( q => increaseQty( q, product.countInStock ) ) }
                                                               subtractQty={ () => setQty( q => decreaseQty( q  ) ) }
                                                               changeQty={ changeQty }
                                                    />
                                                    <button type="button"
                                                            className={ `block border-0 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold uppercase py-2 px-8 cursor-pointer ${!product.countInStock && 'bg-gray-300' }`}
                                                            disabled={ !product.countInStock }
                                                            onClick={ addToCartHandler }
                                                    >
                                                        {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                                    </button>
                                                </div>
                                                { qtyMessage && (
                                                        <div className="text-red-600">
                                                            {qtyMessage}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-8 mt-4">
                                            <div className="col-span-1">
                                                <h2 className="text-3xl text-gray-400 font-semibold mb-4">
                                                    Reviews
                                                </h2>
                                                { loadingReviews && <Loader /> }
                                                { reviews && reviews.length > 0 ?
                                                    reviews.map( ( review: Review ) => (
                                                        <article className="mt-1 py-3 border-t border-gray-300" key={ review._id }>
                                                            <Rating value={ review.rating } />
                                                            <h3 className="font-bold mb-1 mt-2">
                                                                { review.title }
                                                            </h3>
                                                            <p>
                                                                { review.comment }
                                                            </p>
                                                        </article>
                                                    ))
                                                    : <div className="text-gray-400">No reviews yet.</div>
                                                }
                                                { loadingUserReview && <Loader /> }
                                                { loadingCreateReview && <Loader /> }
                                                {
                                                    // If the user hasn't submitted a review, show the form
                                                    !loadingUserReview && !hasReviewed && <div className="mt-8 p-4 border rounded border-gray-300">
                                                        <h3 className="text-lg font-semibold text-gray-500 mb-4">
                                                            Submit your own review for this product.
                                                        </h3>
                                                        <form onSubmit={ submitReviewHandler }>
                                                            <div className="mb-4">
                                                                <label htmlFor="rating" className="label">Rating</label>
                                                                <select name="rating"
                                                                        id="rating"
                                                                        className="input-text"
                                                                        onChange={ (e) => setRating( Number( e.target.value ) ) }
                                                                >
                                                                    <option value="">...</option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                    <option value="5">5</option>
                                                                </select>
                                                            </div>
                                                            <div className="mb-4">
                                                                <label htmlFor="title" className="label">Review Title</label>
                                                                <input type="text"
                                                                       id="title"
                                                                       name="title"
                                                                       className="input-text"
                                                                       placeholder="Title for your review"
                                                                       onChange={ (e) => setTitle( e.target.value ) }
                                                                />
                                                            </div>
                                                            <div className="mb-4">
                                                                <label htmlFor="comment" className="label">Comment</label>
                                                                <textarea id="comment"
                                                                          name="comment"
                                                                          className="input-text"
                                                                          placeholder="Comment for your review"
                                                                          onChange={ (e) => setComment( e.target.value ) }
                                                                ></textarea>
                                                            </div>
                                                            <div>
                                                                <button type="submit"
                                                                        className="primary-button"
                                                                >
                                                                    Add Review
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </>
                                    : <p>Product not found.</p>
                                }
                            </>
                        )
            }
        </>
    )
}

export default ProductDetailScreen;