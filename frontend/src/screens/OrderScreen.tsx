// GENERAL
import { useEffect }        from "react";
import { Link, useParams }  from 'react-router-dom';
import { skipToken }        from "@reduxjs/toolkit/query";
import { useSelector }      from 'react-redux';
import { toast }            from "react-toastify";
import { format }           from "date-fns";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// COMPONENTS
import Message      from "../components/Message";
import Loader       from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage.tsx";

// SLICES
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from "../slices/ordersApiSlice.ts";

// Types
import type { CreateOrderActions, OnApproveActions } from "@paypal/paypal-js";
import type { RootState } from "../store.ts";

const OrderScreen = () => {
    const { orderId } = useParams();

    const { data: order, isLoading, isError, refetch } = useGetOrderDetailsQuery( orderId ?? skipToken );

    const [ payOrder, { isLoading: loadingPay } ] = usePayOrderMutation();
    const [ { isPending }, paypalDispatch ]       = usePayPalScriptReducer();

    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

    const { userInfo } = useSelector( ( state: RootState ) => state.auth);

    useEffect(() => {
        if ( !errorPayPal && !loadingPayPal && paypal.clientId ) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                  type: 'resetOptions',
                  value: {
                      'client-id': paypal.clientId,
                      currency: 'USD'
                  }
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            }
            if ( order && !order.isPaid ) {
                if ( !window.paypal ) {
                    loadPayPalScript();
                }
            }
        }
    }, [ order, paypal ] );

    // FUNCTIONS
    async function onApproveTest(){
        await payOrder({ orderId: orderId!, details: { payer: {} } } );
        refetch();
        toast.success( 'Payment successful.' );
    }

    async function onApprove( _data: unknown, actions: OnApproveActions ): Promise<void> {
        return actions.order?.capture()
            .then( async function (details ) {
                try {
                    await payOrder({ orderId: orderId!, details: { ...details } } );
                    refetch();
                    toast.success( 'Payment successful.' );
                }
                catch ( err ) {
                    console.error( err );
                    const msg = ErrorMessage( err );
                    toast.error( msg );
                }
            });
    }

    async function onError( err: unknown ) {
        const msg = ErrorMessage( err );
        toast.error( msg );
    }

    async function createOrder( _data: unknown, actions: CreateOrderActions ) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice,
                    }
                }
            ]
        }).then( ( orderId: String ) => {
            return orderId;
        });
    }

    if ( isLoading ) return <Loader />;
    if ( isError || order === undefined ) return <Message variant="error">There was an error loading your order.</Message>;

    return (
        <div className="grid grid-cols-12 gap-8 w-full">
            <div className="col-span-9">
                <h1 className="text-xs text-gray-400 mb-4">{ order._id }</h1>
                <h2 className="text-xl text-gray-600">{  }</h2>
                <h2 className="mt-6 py-4 border-t border-gray-200 font-semibold text-2xl text-gray-400">Shipping</h2>
                <p className="mb-2">
                    { order.user.name } <span className="text-gray-400">({order.user.email})</span>
                </p>
                <p className="mb-2">
                    { order.shippingAddress.address }, { order.shippingAddress.city } <br />
                    { order.shippingAddress.province } { order.shippingAddress.postalCode }
                </p>

                <h2 className="mt-6 pt-4 pb-0 border-t border-gray-200 font-semibold text-2xl text-gray-400">Items</h2>
                <div className="grid grid-cols-12 gap-8 text-sm uppercase text-gray-400 border-b border-gray-200 py-3">
                    <div className="col-span-1">&nbsp;</div>
                    <div className="col-span-8"></div>
                    <div className="col-span-1 text-center">Qty</div>
                    <div className="col-span-1 text-end">Price</div>
                    <div className="col-span-1 text-end">Total</div>
                </div>

                <div className="order-list">
                    { order.orderItems.map( ( item ) =>
                        <div key={ item.product } className="grid grid-cols-12 gap-8 py-3 items-center order-list-item">
                            <div className="col-span-1">
                                <Link to={ `/product/${ item.product }`} className="">
                                    <img src={ item.image } alt={ item.name } className="object-cover object-cover-scale rounded-md outline-4 outline-transparent hover:outline-blue-200 hover:scale-105 transition-all duration-300" />
                                </Link>
                            </div>
                            <div className="col-span-8">
                                <Link to={ `/product/${ item.product }`} className="hover:underline font-semibold text-blue-500 hover:text-blue-600">{ item.name }</Link>
                            </div>
                            <div className="col-span-1 text-center">
                                { item.qty }
                            </div>
                            <div className="col-span-1 text-end">
                                { item.price.toLocaleString( 'en-US', { style: 'currency', currency: 'USD' } ) }
                            </div>
                            <div className="col-span-1 text-end">
                                { ( ( item.qty  * ( item.price * 100 ) ) / 100 ).toLocaleString( 'en-US', { style: 'currency', currency: 'USD' } ) }
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="col-span-3">
                <div className="border rounded-md border-gray-200 shadow-md p-4">
                    <h2 className="leading-tight mb-4 pb-4 border-b border-gray-200 font-semibold text-2xl text-gray-400">Order Summary</h2>

                    <div className="grid grid-cols-2 gap-8 py-1">
                        <div className="col-span-1 font-semibold">Subtotal:</div>
                        <div className="col-span-1 text-end">{ ( order.itemsPrice / 100 ).toLocaleString('en-US', { style: "currency", currency: "USD" } ) }</div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 py-1">
                        <div className="col-span-1 font-semibold">Shipping:</div>
                        <div className="col-span-1 text-end">{ ( order.shippingPrice / 100 ).toLocaleString('en-US', { style: "currency", currency: "USD" } ) }</div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 py-1">
                        <div className="col-span-1 font-semibold">Tax:</div>
                        <div className="col-span-1 text-end">{ ( order.taxPrice / 100 ).toLocaleString('en-US', { style: "currency", currency: "USD" } ) }</div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 py-1">
                        <div className="col-span-1 font-semibold">Total:</div>
                        <div className="col-span-1 text-end">{ ( order.totalPrice / 100 ).toLocaleString('en-US', { style: "currency", currency: "USD" } ) }</div>
                    </div>

                    { !order.isPaid ? (
                        <div className="py-1">
                            { loadingPay && <Loader /> }

                            { isPending ? <Loader />
                                : (
                                    <>
                                        {/*<button type="button"*/}
                                        {/*        className="rounded py-2 px-4 mb-3 text-sm font-bold uppercase text-white o bg-blue-500 w-full cursor-pointer"*/}
                                        {/*        onClick={ onApproveTest }*/}
                                        {/*>*/}
                                        {/*    Pay Order (Test)*/}
                                        {/*</button>*/}
                                        <div>
                                            <PayPalButtons
                                                createOrder={ createOrder }
                                                onApprove={ onApprove }
                                                onError={ onError }
                                            />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    ) :
                    (
                        <>

                            <div className="grid grid-cols-2 gap-8 py-1">
                                <div className="col-span-1 font-semibold">Payment:</div>
                                <div className="col-span-1 text-end">
                                        <span className="rounded py-1 px-2 text-xs text-white bg-green-500">
                                            { format( order.paidAt, 'MMM d, yyyy' ) }
                                        </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8 py-1">
                                <div className="col-span-1 font-semibold">Delivery:</div>
                                <div className="col-span-1 text-end">
                                   <span className={`ml-2 rounded py-1 px-2 text-xs text-white ${ order.isDelivered ? 'bg-green-500' : 'bg-red-500' }` }
                                    >
                                        { order.isDelivered || "Not Delivered" }
                                    </span>
                                </div>
                            </div>

                        </>
                    )}
                </div>
            </div>

        </div>
    )
}

export default OrderScreen;