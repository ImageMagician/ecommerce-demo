// GENERAL
import { Link } from "react-router-dom";
import { format } from "date-fns";

// COMPONENTS
import Message      from "../../components/Message";
import Loader       from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage.tsx";

// SLICES
import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice.ts";


const OrderListScreen = () => {
    const { data: orders, isLoading: ordersLoading, error: ordersError } = useGetAllOrdersQuery();

    return <>
        <h1 className="text-2xl text-gray-500 font-semibold mb-4">Orders</h1>

        { ordersLoading ? <Loader />
            : ordersError ? <Message>{ ErrorMessage( ordersError ) }</Message>
                : <>
                    <div className="grid grid-cols-7 gap-8 border-b border-gray-200 pb-2 text-sm text-gray-500">
                        <div className="col-span-3">
                            ORDER ID
                        </div>
                        <div className="col-span-1 text-center">
                            DATE
                        </div>
                        <div className="col-span-1 text-end">
                            TOTAL
                        </div>
                        <div className="col-span-1 text-center">
                            PAID
                        </div>
                        <div className="col-span-1 text-center">
                            DELIVERED
                        </div>
                    </div>

                    {
                        ( orders && orders.length > 0 ) ?
                            <div className="order-list">
                                {
                                    orders.map( ( order ) => (
                                       <div key={order._id} className="grid grid-cols-7 gap-8 text-sm order-list-item items-center">
                                           <div className="col-span-3">
                                               <Link to={`/order/${ order._id }`} className="text-blue-500 hover:text-blue-600 hover:underline">
                                                   { order.orderItems.map( item => <>
                                                       <span className="me-1">{ item.name } ({ item.qty })</span><br />
                                                   </>
                                                   ) }
                                               </Link>
                                           </div>
                                           <div className="col-span-1 text-center">{ format( order.createdAt, "MMM d, yyyy" ) }</div>
                                           <div className="col-span-1 text-end">
                                               { ( order.totalPrice / 100 ).toLocaleString( 'en-US', { style: 'currency', currency: 'USD' } ) }
                                           </div>
                                           <div className="col-span-1 text-center">
                                               {
                                                   order.paidAt ? format( order.paidAt, "MMM d, yyyy" ) : <strong className="text-red-600 font-bold">&times</strong>
                                               }
                                           </div>
                                           <div className="col-span-1 text-center">
                                               {
                                                   order.deliveredAt ? format ( order.deliveredAt, "MMM d, yyyy" ) : <strong className="text-red-600 font-bold">&times;</strong>
                                               }
                                           </div>
                                       </div>
                                    ) )
                                }
                            </div>

                        : <>
                            no orders found
                        </>
                    }
                </>
        }
    </>

}

export default OrderListScreen;