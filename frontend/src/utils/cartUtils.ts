export const updateCart = (state: { itemsPrice: number; cartItems: any[]; shippingPrice: number; taxPrice: number; totalPrice: number; }) => {
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

    return state
}