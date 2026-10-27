// GENERAL
import { PRODUCT_URL } from '../constants';

// SLICES
import { apiSlice} from "./apiSlice"

// TYPES
import type { Product } from "../types"

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => ({
                url: PRODUCT_URL,
            }),
            providesTags: [ 'Product' ],
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query<Product, string>({
            query: ( productId ) => ({
                url: `${ PRODUCT_URL }/${ productId }`,
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation<Product, void>({
            query: () => ({
                url: PRODUCT_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation<Product, void>({
            query: ( data ) => ({
                url: `${ PRODUCT_URL }/:id`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: [ 'Product' ]
        })
    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation } = productsApiSlice