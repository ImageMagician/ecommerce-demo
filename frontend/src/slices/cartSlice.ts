import { createSlice } from '@reduxjs/toolkit';

const cartFromStorage = localStorage.getItem('cart');
const initialState = cartFromStorage ? JSON.parse(cartFromStorage) : { cartItems:[] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {}
})

export default cartSlice.reducer;