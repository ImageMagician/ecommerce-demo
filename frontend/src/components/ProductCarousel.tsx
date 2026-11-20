// GENERAL


// COMPONENTS
import Loader      from './Loader';
import Message     from './Message';
import ProductCard from "./ProductCard";

// SLICES
import { useGetTopProductsQuery } from "../slices/productsApiSlice.ts";

// Types
import type { Product } from '../types.ts'
interface ApiError {
    message: string,
}

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    return  isLoading ? <Loader/>
        : error ? <Message variant="error">{ 'data' in error
                        ? (error.data as ApiError)?.message
                        : 'message' in error
                            ?  error.message
                            : 'An error occurred.'
                    }</Message>
        : <div className="bg-gray-300 p-8">
                <h2 className="text-3xl font-semibold mb-4">Best Sellers</h2>
            <div className="grid grid-cols-3 gap-8">
                {
                    products?.map( ( product:Product ) => (
                        <ProductCard key={product._id} product={ product } />
                    ))
                }
            </div>
        </div>
}

export default ProductCarousel;