import { PRODUCT_URL } from '../constants'
import { apiSlice} from "./apiSlice"
import type { Product } from "../types"

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => ({
                url: PRODUCT_URL,
            }),
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query<Product, string>({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice