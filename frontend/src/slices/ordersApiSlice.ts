import { apiSlice }   from "./apiSlice.ts";
import { ORDERS_URL } from "../constants.ts";

interface Order {
    _id: string;
    user: string;
    orderItems: Order[];
    shippingAddress: object;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface CreateOrderArgs {
    orderItems:      unknown[];
    shippingAddress: unknown[];
    paymentMethod:   string;
    itemsPrice:      number;
    shippingPrice:   number;
    taxPrice:        number;
    totalPrice:      number;
}

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: ( builder ) => ({
        createOrder: builder.mutation<Order, CreateOrderArgs>({
            query: ( order ) => ({
                url: ORDERS_URL,
                method: "POST",
                body: { ...order },
            })
        }),
        getOrderDetails: builder.query<Order, string>({
            query: ( orderId ) => ({
                url: `${ ORDERS_URL }/${ orderId }`
            }),
            keepUnusedDataFor: 10,
        }),
    })
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = ordersApiSlice;