import type {Product} from "../types.ts";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({product}:ProductCardProps) => {
    return (
        <Link to={`/product/${product._id}`} className="border border-gray-300 p-3 my-3 rounded-md shadow hover:scale-[102%] transition-all">
            <div className="relative pb-8 h-full">
                <img src={product.image} alt={product.name} />
                <div className="pt-3">
                    <h3 className={`font-semibold mb-2`}>{product.name}</h3>
                    <p><Rating value={product.rating} text={product.numReviews} /></p>
                </div>
                <p className={`block absolute bottom-0 left-0 text-xl text-gray-500 font-semibold`}>${product.price}</p>
            </div>
        </Link>
    )
}

export default ProductCard;