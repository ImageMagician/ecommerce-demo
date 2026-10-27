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
    return (
        <h1>Product edit screen</h1>
    )
}

export default ProductEditScreen;