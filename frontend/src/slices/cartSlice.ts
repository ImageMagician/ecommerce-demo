import { createSlice } from '@reduxjs/toolkit';
import type {Product} from '../types'

const cartFromStorage = localStorage.getItem('cart');
const initialState = cartFromStorage ? JSON.parse(cartFromStorage) : { cartItems:[] };

const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

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
            state.itemsPrice = addDecimals(state.cartItems.reduce( ( acc: number, item: { price: number; qty: number; } ) => acc + ( item.price * item.qty ), 0 ));

            // Calculate shipping price (if order is over $100 then free else $10)
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            // Calculate tax price
            state.taxPrice = addDecimals( Number( ( state.itemsPrice * 0.15 ).toFixed(2) ) );

            // Calculate total price
            state.totalPrice = Number( state.itemsPrice + state.shippingPrice + state.taxPrice ).toFixed(2);

            localStorage.setItem('cart', JSON.stringify( state ) );
        }
    }
})

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;