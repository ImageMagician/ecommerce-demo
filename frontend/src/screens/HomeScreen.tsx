import type { Product } from "../types.js";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../slices/productsApiSlice.ts";
import Loader from "../components/Loader";
import Message from "../components/Message";

interface ApiError {
    message: string;
}

const HomeScreen = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();

    return (
        <>
            {
                isLoading ? (
                        <Loader />
                    )
                    : error ? (
                            <Message variant="error"
                                     message={ 'data' in error
                                        ? (error.data as ApiError)?.message
                                        : 'message' in error
                                            ?  error.message
                                            : 'An error occurred.'
                                    }
                            />
                        )
                        : (<>
                            <h1 className={`text-3xl font-semibold mb-3`}>Latest Products</h1>
                            <div className={`grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6`}>
                                {products?.map((product:Product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </>)
            }
        </>
    )
};

export default HomeScreen;