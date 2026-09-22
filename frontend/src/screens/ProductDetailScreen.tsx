import React from "react";
import { useParams, useNavigate } from 'react-router-dom'
import Rating from "../components/Rating.tsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { skipToken } from '@reduxjs/toolkit/query/react'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState, useEffect } from "react";
import { addToCart } from "../slices/cartSlice";

interface ApiError {
    message: string;
}

const ProductDetailScreen = () => {
    const { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ qty, setQty ] = useState(1);
    const [ qtyMessage, setQtyMessage ] = useState("");

    const { data: product, isLoading, error } = useGetProductDetailsQuery( productId ?? skipToken );

    function availableQty() {
        return product ? product.countInStock : 0;
    }

    function addQty () {
        const available:number = availableQty();

        if ( qty < available ) {
            setQty( qty + 1 );
        }
    }
    function subtractQty () {
        setQty( qty > 1 ? qty - 1 : 1 );
    }

    function changeQty ( e: React.ChangeEvent<HTMLInputElement> ) {
        const available:number = availableQty();
        const value = parseInt( e.currentTarget.value );

        if ( value <= available ) {
            setQty( isNaN(value) ? 1 : value );
            setQtyMessage('');
        }
        else {
            setQty( available );
        }
    }

    useEffect(() => {
        const available: number = availableQty();

        if ( qty >= available && available > 0 ) {
            setQtyMessage(`Only ${available} left in stock.`);
        }
        else {
            setQtyMessage('');
        }
    }, [qty, product]);

    const addToCartHandler = () => {
        dispatch(addToCart({
            ...product,
            qty
        }));
        navigate( "/cart" );
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
                            <Message variant="error"
                                     message={'data' in error
                                        ? (error.data as ApiError)?.message
                                        : 'message' in error
                                            ? error.message
                                            : 'An error occurred.'
                                    }
                            />
                        )
                        : (
                            <>
                                { product
                                    ? <div className="sm:flex sm:gap-8">
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
                                            <div className={`flex gap-4 mb-4`}
                                            >
                                                <div id="qty" className={`flex gap-1 ${product.countInStock === 0 && 'hidden' }`}>
                                                    <button type="button"
                                                            className="bg-blue-500 hover:bg-blue-600 text-white uppercase text-sm font-semibold rounded px-2 py-1 disabled:bg-gray-300 cursor-pointer"
                                                            disabled={ qty === 1 }
                                                            onClick={subtractQty}
                                                    >
                                                        –
                                                    </button>
                                                    <input type="text"
                                                           value={qty}
                                                           className="border border-gray-200 px-2 py-1 w-10 text-center rounded"
                                                           onChange={(e) => changeQty(e)}
                                                    />
                                                    <button type="button"
                                                            className="bg-blue-500 hover:bg-blue-600 text-white uppercase text-sm font-semibold rounded px-2 py-1 disabled:bg-gray-300 cursor-pointer"
                                                            onClick={addQty}
                                                            disabled={ qty >= product.countInStock }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button type="button"
                                                        className={`block border-0 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold uppercase py-2 px-8 cursor-pointer ${!product.countInStock && 'bg-gray-300'}`}
                                                        disabled={!product.countInStock}
                                                        onClick={addToCartHandler}
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
                                    : <p>Product not found.</p>
                                }
                            </>
                        )
            }
        </>
    )
}

export default ProductDetailScreen;