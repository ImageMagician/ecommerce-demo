import { Link, useParams } from 'react-router-dom';
import Message from "../components/Message";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice.ts";

const OrderScreen = () => {
    const { orderId } = useParams();

    const { data: order, refetch, isLoading, isError } = useGetOrderDetailsQuery();

    console.log( order );

    return <>
        <h1>Order screen</h1>
    </>
}

export default OrderScreen;