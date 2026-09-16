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
        })
    })
})

export const { useGetProductsQuery } = productsApiSlice