// GENERAL
import { Link }             from "react-router-dom";
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";
import { faTrash, faEdit }  from "@fortawesome/free-solid-svg-icons";
import {toast}              from "react-toastify";

// COMPONENTS
import Loader       from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

// SLICES
import { useGetProductsQuery, useCreateProductMutation } from "../../slices/productsApiSlice.ts";

// TYPES
import type { Product } from "../../types.ts";

const ProductListScreen = () => {
    const { data: products, isLoading }          = useGetProductsQuery();
    const [ createProduct, { isLoading: loadingCreate } ] = useCreateProductMutation();

    const deleteProductHandler = ( id: string ) => {
        console.log( 'deleting product', id );
    }

    const editProductHandler = ( id: string ) => {
        console.log( "editing product", id );
    }

    const createProductHandler = async () => {
        if ( window.confirm('Are you sure you want to create a new product?') ) {
            try {
                await createProduct().unwrap();
            }
            catch ( err ) {
                toast.error( ErrorMessage( err ) );
            }
        }
    }

    return <>
        <div className="flex justify-between items-center mb-5">
            <h1 className="text-3xl text-gray-500">Product List</h1>
            <button type="button"
                    className="primary-button"
                    onClick={ createProductHandler }
            >
                + Add Product
            </button>
        </div>

        <div className="grid grid-cols-12 gap-8 text-sm uppercase text-gray-400 border-b border-gray-200 pb-1">
            <div className="col-span-1 px-2">IMAGE</div>
            <div className="col-span-5">NAME</div>
            <div className="col-span-1">BRAND</div>
            <div className="col-span-1">CATEGORY</div>
            <div className="col-span-1">PRICE</div>
            <div className="col-span-1 text-center">STOCK</div>
            <div className="col-span-1 text-center">RATING</div>
            <div className="col-span-1"></div>

        </div>
        { loadingCreate && <Loader /> }
        { isLoading ? <Loader />
            : products && products.length > 0 ?
                <div className="order-list">
                {
                    products.map( ( product: Product ) =>
                        <div key={ product._id }
                             className="grid grid-cols-12 gap-8 order-list-item items-center py-1 outline-1 outline-transparent hover:outline-blue-500 transition duration-200"
                        >
                            <div className="col-span-1 px-2">
                                <img src={ product.image } alt={ product.name } className="object-cover rounded" />
                            </div>
                            <div className="col-span-5">
                                <Link to={`/admin/product/${ product._id }`} className="text-blue-500 hover:text-blue-600 hover:underline">
                                    { product.name }
                                </Link>
                            </div>
                            <div className="col-span-1">
                                { product.brand }
                            </div>
                            <div className="col-span-1">
                                { product.category }
                            </div>
                            <div className="col-span-1">
                                { product.price.toLocaleString('en-US', { style: "currency", currency: "USD" } ) }
                            </div>
                            <div className="col-span-1 text-center">
                                { product.countInStock }
                            </div>
                            <div className="col-span-1 text-center">
                                { product.rating }
                            </div>
                            <div className="col-span-1 text-center">
                                <button type="button"
                                        onClick={ () => editProductHandler( product._id) }
                                >
                                    <FontAwesomeIcon icon={ faEdit } size="sm" className="p-2 text-gray-400 hover:bg-gray-200 rounded cursor-pointer" />
                                </button>
                                <button type="button"
                                        onClick={ () => deleteProductHandler( product._id ) }
                                >
                                    <FontAwesomeIcon icon={faTrash} size="sm" className="p-2 text-gray-400 hover:bg-gray-200 rounded cursor-pointer" />
                                </button>
                            </div>
                        </div>
                    )
                }
                </div>

            :
                <div className="text-center py-8 text-lg text-semibold text-gray-500">
                    No products found.
                </div>
        }
    </>
}

export default ProductListScreen;