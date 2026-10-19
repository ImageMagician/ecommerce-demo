import { apiSlice }   from "./apiSlice.ts";
import { ORDERS_URL } from "../constants.ts";

export interface OrderItem {
    product:      string;
    name:         string;
    image:        string;
    brand:        string;
    category:     string;
    description:  string;
    rating:       number;
    numReviews:   number;
    price:        number;
    countInStock: number;
    qty:          number;
}

export interface Order {
    _id: string;
    user: {
        _id:   string;
        email: string;
        name:  string
    };
    orderItems:     OrderItem[];
    shippingAddress: {
        address:    string;
        city:       string;
        province:   string;
        postalCode: string;
    };
    paymentMethod:  string;
    itemsPrice:     number;
    shippingPrice:  number;
    taxPrice:       number;
    totalPrice:     number;
    isPaid:         boolean;
    isDelivered:    boolean;
    createdAt:      Date;
    updatedAt:      Date;
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