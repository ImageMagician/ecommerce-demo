// GENERAL
import { Link, useParams } from 'react-router-dom';
import { skipToken }       from "@reduxjs/toolkit/query";

// COMPONENTS
import Message from "../components/Message";
import Loader  from "../components/Loader";

// SLICES
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice.ts";

const OrderScreen = () => {
    const { orderId } = useParams();

    const { data: order, isLoading, isError } = useGetOrderDetailsQuery( orderId ?? skipToken ); // add refetch when ready

    if ( isLoading ) return <Loader />;
    if ( isError || order === undefined ) return <Message variant="error">There was an error loading your order.</Message>;

    return (
        <>
        <div className="grid grid-cols-12 gap-8 w-full">
            <div className="col-span-9">
                <h1 className="text-xs text-gray-400 mb-4">{ order._id }</h1>
                <h2 className="text-xl text-gray-600">{  }</h2>
                <h2 className="mt-6 py-4 border-t border-gray-200 font-semibold text-2xl text-gray-400">Shipping</h2>
                <p className="mb-2">{ order.user.name }</p>
                <p className="mb-2">
                    { order.shippingAddress.address }, { order.shippingAddress.city } <br />
                    { order.shippingAddress.province } { order.shippingAddress.postalCode }
                </p>
                <p className="mb-2">{ order.user.email }</p>

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

                    <div className="grid grid-cols-2 gap-8 py-1">
                        <div className="col-span-1 font-semibold">Payment:</div>
                        <div className="col-span-1 text-end">
                            <span className={`ml-2 rounded py-1 px-2 text-xs text-white order.isPaid ? bg-green-500 : bg-red-500` }>
                                { order.isPaid || "Not Paid" }
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 py-1">
                        <div className="col-span-1 font-semibold">Delivery:</div>
                        <div className="col-span-1 text-end">
                           <span className={`ml-2 rounded py-1 px-2 text-xs text-white order.isDelivered ? bg-green-500 : bg-red-500` }
                            >
                        { order.isDelivered || "Not Delivered" }
                    </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>

    )
}

export default OrderScreen;