import { createSlice } from '@reduxjs/toolkit';
import type {Product} from '../types';
import {updateCart} from "../utils/cartUtils.ts";

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

            return updateCart(state);
        }
    }
})

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;