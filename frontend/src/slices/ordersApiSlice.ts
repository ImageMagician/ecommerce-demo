import { apiSlice }   from "./apiSlice.ts";
import { ORDERS_URL } from "../constants.ts";

interface Order {
    _id: string;
}

interface CreateOrderArgs {
    orderItems:      unknown[];
    shippingAddress: unknown[];
    paymentMethod:   string;
    itemsPrice:      number;
    shippingPrice:   number;
    taxPrice:        number;
    totalPrice:      number;
    userId:          string;
}

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: ( builder ) => ({
        createOrder: builder.mutation<Order, CreateOrderArgs>({
            query: ( order ) => ({
                url: ORDERS_URL,
                method: "POST",
                body: { ...order },
            })
        })
    })
});

export const { useCreateOrderMutation } = ordersApiSlice;