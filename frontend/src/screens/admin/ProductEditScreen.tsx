// GENERAL
import { useState, useEffect }          from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast }                        from "react-toastify";

// COMPONENTS
import Loader        from "../../components/Loader.tsx";
import FormContainer from "../../components/FormContainer.tsx";

// SLICES
import { useGetProductDetailsQuery, useUpdateProductMutation } from "../../slices/productsApiSlice.ts";

// TYPES
import type { Product } from "../../types";

const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const [ name, setName ]                 = useState("");
    const [ image, setImage ]               = useState("");
    const [ price, setPrice ]               = useState("");
    const [ brand, setBrand ]               = useState("");
    const [ category, setCategory ]         = useState("");
    const [ countInStock, setCountInStock ] = useState("");
    const [ description, setDescription ]   = useState("");

    return (
        <h1>Product edit screen</h1>
    )
}

export default ProductEditScreen;