// GENERAL
import { Link, useParams } from 'react-router-dom';
import { skipToken }       from "@reduxjs/toolkit/query";

// COMPONENTS
import Message from "../components/Message";

// SLICES
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice.ts";

const OrderScreen = () => {
    const { orderId } = useParams();

    const { data: order, refetch, isLoading, isError } = useGetOrderDetailsQuery( orderId ?? skipToken );

    return <>
        <h1>Order screen</h1>
    </>
}

export default OrderScreen;