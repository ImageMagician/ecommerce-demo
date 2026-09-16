import { useParams } from 'react-router-dom'
import Rating from "../components/Rating.tsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../types.ts";

const ProductDetailScreen = () => {
    const { id: productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`/api/products/${productId}`);
                setProduct(data);
            }
            catch (err) {
                console.log('product fetch failed: ', err);
            }
        }
        fetchProducts();
    }, [])

    return (
        <div>
            <div className="text-right mb-8">
                <Link to={'/'} className={`py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white uppercase text-sm font-semibold rounded`}>Back</Link>
            </div>
        { product
            ? <div className="sm:flex sm:gap-8">
                <div className={`sm:w-1/2 mb-4 sm:mb-0`}>
                    <img src={product.image} alt={product.name} className={`w-full rounded-md`}/>
                </div>
                <div className={`sm:w-1/2`}>
                    <h1 className={`text-3xl font-bold mb-2`}>{product.name}</h1>
                    <div className={`mb-2`}>
                        <Rating value={product.rating} text={product.numReviews} />
                    </div>
                    <div className="flex gap-4 items-center mb-4">
                        <div className={`text-4xl font-semibold text-blue-500 leading-tight ${product.countInStock === 0 && 'line-through'}`}>
                            ${product.price}

                        </div>
                        { product.countInStock < 10 && product.countInStock > 0
                            && <span className="text-red-500 ml-2 inline-block">Only {product.countInStock} left in stock!</span>
                        }
                    </div>
                    <p className={`mb-4`}>{product.description}</p>
                    <div>
                        <button type="button"
                                className={`block border-0 rounded-md bg-blue-500 hover:bg-button-600 text-white font-semibold uppercase py-2 px-8 ${!product.countInStock && 'bg-gray-300'}`}
                                disabled={!product.countInStock}
                        >
                            { product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock' }
                        </button>
                    </div>
                </div>
            </div>
            : <p>Product not found.</p>
        }
        </div>
    )
}

export default ProductDetailScreen;