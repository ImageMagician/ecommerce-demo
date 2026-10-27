// GENERAL
import { useState, useEffect }          from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { skipToken}                     from "@reduxjs/toolkit/query/react";
import { toast }                        from "react-toastify";

// COMPONENTS
import Loader        from "../../components/Loader.tsx";
import Message       from "../../components/Message.tsx";
import FormContainer from "../../components/FormContainer.tsx";
import ErrorMessage  from "../../components/ErrorMessage.tsx";

// SLICES
import { useGetProductDetailsQuery, useUpdateProductMutation } from "../../slices/productsApiSlice.ts";

// TYPES
import type { ProductUpdate } from "../../types";

const ProductEditScreen = () => {
    const navigate = useNavigate();
    const { id: productId } = useParams();

    const [ name, setName ]                 = useState("");
    const [ image, setImage ]               = useState("");
    const [ brand, setBrand ]               = useState("");
    const [ category, setCategory ]         = useState("");
    const [ description, setDescription ]   = useState("");
    const [ price, setPrice ]               = useState("");
    const [ countInStock, setCountInStock ] = useState("");

    const { data: product, isLoading, isUninitialized, error } = useGetProductDetailsQuery( productId ?? skipToken );

    const [ updateProduct, { isLoading:loadingUpdate } ] = useUpdateProductMutation();

    useEffect( () => {
        if ( product ) {
            setName         ( product.name );
            setImage        ( product.image );
            setBrand        ( product.brand );
            setCategory     ( product.category );
            setDescription  ( product.description );
            setPrice        ( String( product.price ) );
            setCountInStock ( String ( product.countInStock ) );
        }
    }, [ product ] );

    const submitHandler = async ( e: { preventDefault: () => void; } ) => {
        e.preventDefault();

        if ( !productId ) {
            return toast.error( "There was an error with finding the product in our database." );
        }

        const productUpdateValues: ProductUpdate = {
            _id: productId,
            name,
            price: Number ( price ),
            image,
            brand,
            category,
            description,
            countInStock: Number ( countInStock ),
        };

        const res = await updateProduct( productUpdateValues );

        if ( "error" in res ) {
            toast.error( ErrorMessage( res.error ) );
        }
        else {
            toast.success("Product updated successfully");
            navigate( "/admin/products" );
        }
    }

    return <FormContainer>
        <div className="text-end mb-4">
            <Link to="/admin/products" className="minimal-button">
                Back to Products
            </Link>
        </div>

        <h1 className="text-3xl mb-4 font-semibold text-gray-400">Update Product</h1>

        { loadingUpdate || isUninitialized && <Loader /> }
        { isLoading && <Loader /> }
        { error && <Message variant="error">There was an error loading the product.</Message> }

        <form onSubmit={ submitHandler } encType="multipart/form-data">
            <div className="mb-4">
                <label htmlFor="name"
                       className="label"
                >
                    Name
                </label>
                <input type="text"
                       className="input-text"
                       value={ name }
                       id="name"
                       name="name"
                       placeholder="Enter your name"
                       onChange={ (e) => setName(e.target.value) }
                />
            </div>
            <div className="mb-4">
                <label htmlFor="image"
                       className="label"
                >
                    Image
                </label>
                <input type="file"
                       className="input-text"
                       id="image"
                       name="image"
                       placeholder="Click to add photo"
                       onChange={ (e) => setImage(e.target.value) }
                />
            </div>
            <div className="mb-4">
                <label htmlFor="brand"
                       className="label"
                >
                    Brand
                </label>
                <input type="text"
                       className="input-text"
                       value={ brand }
                       id="brand"
                       name="brand"
                       placeholder="Enter brand"
                       onChange={ (e) => setBrand(e.target.value) }
                />
            </div>
            <div className="mb-4">
                <label htmlFor="category"
                       className="label"
                >
                    Category
                </label>
                <input type="text"
                       className="input-text"
                       value={ category }
                       id="category"
                       name="category"
                       placeholder="Enter category"
                       onChange={ (e) => setCategory(e.target.value) }
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description"
                       className="label"
                >
                    description
                </label>
                <textarea
                       className="input-text"
                       id="description"
                       name="description"
                       value={ description }
                       placeholder="Enter description"
                       onChange={ (e) => setDescription(e.target.value) }
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price"
                       className="label"
                >
                    Price
                </label>
                <input type="number"
                       className="input-text"
                       value={ price }
                       id="price"
                       name="price"
                       placeholder="Enter price"
                       onChange={ (e) => setPrice(e.target.value) }
                />
            </div>
            <div className="mb-4">
                <label htmlFor="countInStock"
                       className="label"
                >
                    Amount in Stock
                </label>
                <input type="number"
                       className="input-text"
                       value={ countInStock }
                       id="countInStock"
                       name="countInStock"
                       placeholder="Enter inventory"
                       onChange={ (e) => setCountInStock(e.target.value) }
                />
            </div>
            <div>
                <button type="submit"
                        className="primary-button"
                >
                    Update Product
                </button>
            </div>
        </form>

    </FormContainer>
}

export default ProductEditScreen;