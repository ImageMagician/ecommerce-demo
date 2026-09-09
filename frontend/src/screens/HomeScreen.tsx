import products from "../products.ts";
import type { Product } from "../types.js";
import ProductCard from "../components/ProductCard";
const HomeScreen = () => {
    return (
        <>
            <h1 className={`text-3xl font-semibold mb-3`}>Latest Products</h1>
            <div className={`grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6`}>
                {products.map((product:Product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </>
    )
};

export default HomeScreen;