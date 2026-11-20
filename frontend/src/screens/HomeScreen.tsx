// GENERAL
import { useSearchParams } from "react-router-dom";

// COMPONENTS
import ProductCard      from "../components/ProductCard";
import Loader           from "../components/Loader";
import Message          from "../components/Message";
import Paginate         from "../components/Paginate";
import SearchBox        from "../components/SearchBox";
import ProductCarousel  from "../components/ProductCarousel";

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
    const keyword = searchParams.get( 'keyword' ) || undefined;

    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber: page });

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
                            <div className="my-4">
                                <ProductCarousel />
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <h1 className={`text-3xl font-semibold mb-3`}>Latest Products</h1>
                                <SearchBox />
                            </div>
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