import { apiSlice }   from "./apiSlice.ts";
import { ORDERS_URL, PAYPAL_URL } from "../constants.ts";

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
    paidAt:         Date;
    deliveredAt:    Date;
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

interface PayOrderArgs {
    orderId: string;
    details: Record<string, unknown>;
}

interface PayPalConfig {
    clientId: string;
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
        payOrder: builder.mutation<Order, PayOrderArgs>({
            query: ( { orderId, details } ) => ({
                url: `${ ORDERS_URL }/${ orderId }/pay`,
                method: "PUT",
                body: { ...details }
            })
        }),
        getPayPalClientId: builder.query<PayPalConfig, void>({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 10,
        }),
        getMyOrders: builder.query<Order[], void>({
            query: () => ({
                url: `${ ORDERS_URL }/myorders`,
            }),
            keepUnusedDataFor: 10,
        })
    })
});

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
    useGetMyOrdersQuery,
} = ordersApiSlice;