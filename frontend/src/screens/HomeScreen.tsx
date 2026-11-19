// GENERAL
import { useSearchParams } from "react-router-dom";

// COMPONENTS
import ProductCard  from "../components/ProductCard";
import Loader       from "../components/Loader";
import Message      from "../components/Message";
import Paginate     from "../components/Paginate";

// SLICES
import { useGetProductsQuery } from "../slices/productsApiSlice.ts";

// TYPES
import type { Product } from "../types.js";

interface ApiError {
    message: string;
}

const HomeScreen = () => {
    const [ searchParams ] = useSearchParams();
    const page = Number( searchParams.get( 'pageNumber' ) ) || 1;
    const { data, isLoading, error } = useGetProductsQuery({ pageNumber: page });

    return (
        <>
            {
                isLoading ? (
                        <Loader />
                    )
                    : error ? (
                            <Message variant="error">
                                     { 'data' in error
                                        ? (error.data as ApiError)?.message
                                        : 'message' in error
                                            ?  error.message
                                            : 'An error occurred.'
                                    }
                            </Message>
                        )
                        : (<>
                            <h1 className={`text-3xl font-semibold mb-3`}>Latest Products</h1>
                            <div className={`grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6`}>
                                {data?.products.map((product:Product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                                { data &&
                                    <Paginate pages={ data.pages } page={ data.page } />
                                }
                        </>)
            }
        </>
    )
};

export default HomeScreen;