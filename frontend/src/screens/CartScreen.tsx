import { Link, useNavigate }            from 'react-router-dom';
import { useSelector, useDispatch }     from "react-redux";
import { addToCart, removeFromCart }    from "../slices/cartSlice.ts";

import { FontAwesomeIcon }              from "@fortawesome/react-fontawesome";
import {  faTrash }                     from '@fortawesome/free-solid-svg-icons';

import Message                          from "../components/Message";
import QtyPicker                        from "../components/QtyPicker";

import { increaseQty, decreaseQty, clampQty } from "../utils/quantity";

import type { RootState } from '../store';
import type { CartItem, Product} from '../types';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector( ( state: RootState ) => state.cart );
    const { cartItems } = cart;

    const updateQuantity = async ( item: Product, qty: number )=> {
        dispatch( addToCart({ ...item, qty }));
    }

    const removeItem = async ( id: string )=> {
        dispatch( removeFromCart( id ) );
    }

    const checkoutHandler = () => {
        navigate( "/login?redirect=/shipping" );
    }

    return <div>
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        { cartItems.length === 0 ? (
                <Message message="Your cart is empty." />
            ) :
            (
                <>
                    <h2 className="flex items-center justify-between gap-8 border-b border-gray-300">
                        <span className="block w-37.5 p-2">Image</span>
                        <span className="w-full p-2">Product</span>
                        <span className="p-2">QTY</span>
                        <span className="p-2 text-nowrap">Price/Item</span>
                        <span className="p-2 text-nowrap">Total Price</span>
                    </h2>
                    <ul className="mb-4">
                        {
                            cartItems.map((item: CartItem) => (
                                <li key={item._id} className="py-8 border-b border-gray-200 justify-between flex items-center gap-8">
                                    <img src={item.image} alt={item.name} className="w-37.5 rounded-md" />
                                    <div className="w-full p-2">
                                        <h3 className="text-xl font-bold mb-2">
                                            <Link to={`/product/${item._id}`} className="hover:text-blue-500">{item.name}</Link>
                                        </h3>
                                        <p className="uppercase text-gray-500 text-sm flex gap-8">
                                            <span><span className="text-gray-300">brand</span> { item.brand }</span>
                                            <span><span className="text-gray-300">category</span> { item.category }</span>
                                        </p>
                                    </div>
                                    <div className="p-2 text-center flex items-center gap-4">
                                        <QtyPicker product={item} qty={item.qty}
                                                   addQty={ ()      => updateQuantity( item, increaseQty( item.qty, item.countInStock ) ) }
                                                   subtractQty={ () => updateQuantity( item, decreaseQty( item.qty ) ) }
                                                   changeQty={ value => updateQuantity( item, clampQty( value, item.countInStock ) ) }
                                        />
                                        <button onClick={ () => removeItem( item._id ) }
                                                className="p-2 text-xs bg-gray-200 hover:bg-gray-400 rounded-md cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={ faTrash } />
                                        </button>
                                    </div>
                                    <div className="p-2">${ item.price.toLocaleString('en-US') }</div>
                                    {/* multiply price by 100 to calculate with whole number to avoid decimal binary calc issues */}
                                    <div className="p-2">${ ( ( ( item.price * 100) * item.qty ) / 100 ).toLocaleString('en-US') }</div>
                                </li>
                            ))
                        }
                    </ul>
                    <dl className="ml-auto grid w-full max-w-xs grid-cols-[1fr_auto] gap-x-8 gap-y-2">
                        <dt className="text-gray-600">
                            Subtotal:
                        </dt>
                        <dd className="text-right tabular-nums">
                            ${ ( cart.itemsPrice / 100 ).toLocaleString('en-US') }
                        </dd>

                        <dt className="col-span-2 border-t border-gray-200"></dt>

                        <dt className="text-gray-600">
                            Shipping:
                        </dt>
                        <dd className="text-right tabular-nums">
                            ${ ( cart.shippingPrice / 100 ).toLocaleString('en-US') }
                        </dd>

                        <dt className="col-span-2 border-t border-gray-200"></dt>

                        <dt className="text-gray-600">
                            Tax:
                        </dt>
                        <dd className="text-right tabular-nums">
                            ${ ( cart.taxPrice / 100 ).toLocaleString("en-US") }
                        </dd>

                        <dt className="col-span-2 border-t border-gray-200"></dt>

                        <dt className="text-gray-600 font-semibold">
                            Total:
                        </dt>
                        <dd className="text-right tabular-nums font-semibold">
                            ${ (cart.totalPrice / 100).toLocaleString('en-US') }
                        </dd>

                        <dt className="col-span-2 mt-2">
                            <button type="button"
                                    disabled={ cartItems.length === 0 }
                                    className="bg-blue-500 hover:bg-blue-600 w-full px-4 py-2 text-white disabled:bg-gray-400 rounded-md cursor-pointer"
                                    onClick={ checkoutHandler }
                            >
                                Proceed to Checkout
                            </button>
                        </dt>
                    </dl>
                </>
            )
        }
    </div>
}

export default CartScreen;