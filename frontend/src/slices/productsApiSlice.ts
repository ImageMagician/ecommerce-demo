// GENERAL
import { PRODUCT_URL, UPLOADS_URL } from '../constants';

// SLICES
import { apiSlice} from "./apiSlice"

// TYPES
import type { Product, ProductUpdate, UploadResponse } from "../types"

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
            providesTags: ( _result, _error, productId ) => [
                {
                    type: "Product",
                    id: productId
                },
            ],
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation<Product, void>({
            query: () => ({
                url: PRODUCT_URL,
                method: 'POST'
            }),
            invalidatesTags: [ 'Product' ],
        }),
        updateProduct: builder.mutation<Product, ProductUpdate>({
            query: ( data ) => ({
                url: `${ PRODUCT_URL }/${ data._id }`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: [ 'Product' ]
        }),
        uploadProductImage: builder.mutation<UploadResponse, FormData>({
            query: ( data ) => ({
                url: UPLOADS_URL,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: ( productId ) => ({
                url: `${ PRODUCT_URL }/${ productId }`,
                method: 'DELETE',
            }),
        }),
    })
})

export const { useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation } = productsApiSlice