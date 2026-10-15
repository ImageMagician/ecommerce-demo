// GENERAL
import { useEffect, useState }      from 'react';
import { Link, useNavigate }        from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast }                    from 'react-toastify';

// COMPONENTS
import Message       from '../components/Message';
import CheckoutSteps from "../components/CheckoutSteps.tsx";

// SLICES
import { useCreateOrderMutation } from "../slices/ordersApiSlice.ts";
import { clearCartItems }         from "../slices/cartSlice.ts";

// TYPES
import type { RootState }           from "../store.ts";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError }     from "@reduxjs/toolkit";

// INTERFACE PROPS
interface cartItems {
    name: string;
    brand: string;
    countInStock: number;
    createdAt: Date;
    description: string;
    image: string;
    numReviews: number;
    price: number;
    qty: number;
    rating: number;
    reviews: Array<string>;
    updatedAt: Date;
    user: string;
    __v: boolean;
    _id: string;
}

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart     = useSelector( ( state: RootState ) => state.cart );
    const userInfo = useSelector( ( state: RootState ) => state.auth.userInfo );

    const [ createOrder, { isLoading, error } ] = useCreateOrderMutation();

    // Error handling from useCreatOrderMutation
    const getErrorMessage = ( error: FetchBaseQueryError | SerializedError ) => {
        if ( 'status' in error ) {
            // FetchBaseQuery error
            if ( 'error' in error ) {
                return error.error;
            }
            const data = error.data as { message?: string } | undefined;
            return data?.message ?? 'An unexpected error occurred';
        }

        // SerializedError
        return error.message ?? 'An unexpected error occurred';
    }

    // Redirect if there is missing information
    useEffect( () => {
        if ( ! cart.shippingAddress.address ) {
            navigate( "/shipping" );
        }
        else if ( ! cart.paymentMethod ) {
            navigate( "/payment" );
        }
    }, [ cart.paymentMethod, cart.shippingAddress.address, navigate])

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems:      cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod:   cart.paymentMethod,
                itemsPrice:      cart.itemsPrice,
                shippingPrice:   cart.shippingPrice,
                taxPrice:        cart.taxPrice,
                totalPrice:      cart.totalPrice
            }).unwrap();

            dispatch( clearCartItems() );
            navigate(  `/order/${ res._id }` );
        }
        catch ( err: any ) {
            toast.error( err.data?.message || err.message || "Something went wrong in placing your order." );
        }
    }


    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="sm:col-span-2">
                    <div className="py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-600 mb-2">
                            Shipping
                        </h2>
                        <p>
                            <strong className="me-2">Address</strong>
                            { cart.shippingAddress.address },&nbsp;
                            { cart.shippingAddress.city },&nbsp;
                            { cart.shippingAddress.province },&nbsp;
                            { cart.shippingAddress.country }
                        </p>
                    </div>
                    <div className="py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-600 mb-2">
                            Payment Method
                        </h2>
                        <p>
                            <strong className="me-2">Method</strong>
                            { cart.paymentMethod }
                        </p>
                    </div>
                    <div className="pt-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-600 mb-2">
                            Order Items
                        </h2>
                        <div className="order-list">

                        { cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) :
                            (
                                cart.cartItems.map( ( item: cartItems, index: number ) => (
                                        <div key={ index } className="order-list-item">
                                            <div className="flex gap-6 items-center">
                                                <div className="w-24">
                                                    <img src={ item.image } alt={ item.name } className="rounded-md" />
                                                </div>
                                                <div className="w-full flex gap-6 justify-between items-center">
                                                    <Link to={`/product/${item._id}`} className="underline font-semibold">
                                                        { item.name }
                                                    </Link>
                                                    <div className="text-right">
                                                        { item.qty } x ${ item.price.toLocaleString('en-US') } = { ( item.qty * item.price ).toLocaleString('en-US', { style: 'currency', currency: 'USD' } ) }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            )
                        }
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <div className="border border-gray-200 shadow-md p-5 order-list">
                        <h2 className="text-xl font-semibold pb-2 border-b border-gray-200 text-gray-500">Order Summary</h2>
                        <div className="sm:grid sm:grid-cols-2 gap-6 order-list-item">
                            <div className="sm:col-span-1">
                                Items
                            </div>
                            <div className="sm:col-span-1 text-end">
                                { ( cart.itemsPrice / 100 ).toLocaleString('en-US', { style: 'currency', currency: 'USD' } ) }
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-2 gap-6 order-list-item">
                            <div className="sm:col-span-1">
                                Shipping
                            </div>
                            <div className="sm:col-span-1 text-end">
                                { ( cart.shippingPrice / 100 ).toLocaleString('en-US', { style: 'currency', currency: 'USD' } ) }
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-2 gap-6 order-list-item">
                            <div className="sm:col-span-1">
                                Tax
                            </div>
                            <div className="sm:col-span-1 text-end">
                                { ( cart.taxPrice / 100 ).toLocaleString('en-US', { style: 'currency', currency: 'USD' } ) }
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-2 gap-6 order-list-item">
                            <div className="sm:col-span-1">
                                Total Price
                            </div>
                            <div className="sm:col-span-1 text-end">
                                { ( cart.totalPrice / 100 ).toLocaleString('en-US', { style: 'currency', currency: 'USD' } ) }
                            </div>
                        </div>
                        <div className="order-list-item pb-0!">
                            { error && <Message>{ getErrorMessage( error ) }</Message> }
                            <button type="button"
                                    className="primary-button w-full"
                                    onClick={ placeOrderHandler }
                                    disabled={ isLoading }
                            >
                                { isLoading ? <>&bull; &bull; &bull;</> : 'Place Order' }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PlaceOrderScreen;