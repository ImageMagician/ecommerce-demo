import { createSlice } from '@reduxjs/toolkit';
import type {Product} from '../types'

const cartFromStorage = localStorage.getItem('cart');
const initialState = cartFromStorage ? JSON.parse(cartFromStorage) : { cartItems:[] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x: Product) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x: Product) => x._id === existItem._id ? item : x);
            }
            else {
                state.cartItems = [...state.cartItems, item];
            }

            // Calculate items price
            state.itemsPrice = state.cartItems.reduce( ( acc: number, item: { price: number; qty: number; } ) =>
                acc + ( ( item.price * 100 ) * item.qty ), 0
            );

            // Calculate shipping price (if order is over $100 then free else $10)
            state.shippingPrice = state.itemsPrice > 10000 ? 0 : 10;

            // Calculate tax price
            // multiply itemPrice by 100 to avoid binary calculation issues.
            state.taxPrice = Math.round( state.itemsPrice * .15 );

            // Calculate total price
            state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;

            localStorage.setItem('cart', JSON.stringify( state ) );
        }
    }
})

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;