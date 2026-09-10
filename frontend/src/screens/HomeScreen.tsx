import { useEffect, useState } from "react";
import type { Product } from "../types.js";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                console.log("data: ", data);
                setProducts(data);
            }
            catch (err) {
                console.log('products fetch failed: ', err);
            }
        }
        fetchProducts();
    }, [])

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