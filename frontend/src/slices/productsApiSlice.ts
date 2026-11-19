// GENERAL
import { PRODUCT_URL, UPLOADS_URL } from '../constants';

// SLICES
import { apiSlice } from "./apiSlice"

// TYPES
import type { Product, ProductUpdate, UploadResponse, Review, AddReview } from "../types"

type GetProductReviewByUserArgs = {
    product: string,
    user: string,
}

type ReviewProductArgs = {
    product: string,
    user: string,
    rating: number,
    title: string,
    comment: string,
}

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
                { type: "Product", id: productId },
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
        deleteProduct: builder.mutation<void, string>({
            query: ( productId ) => ({
                url: `${ PRODUCT_URL }/${ productId }`,
                method: 'DELETE',
            }),
            invalidatesTags: [ 'Product' ],
        }),
        getProductReviews: builder.query<Review[], string>({
            query: ( productId ) => ({
                url: `${ PRODUCT_URL }/${ productId }/reviews`,
            }),
            providesTags: ( _result, _error, productId ) => [
                { type: 'Review', id: productId }
            ],
        }),
        getProductReviewByUser: builder.query<Review | null, GetProductReviewByUserArgs>({
            query: ( data ) => ({
                url: `${ PRODUCT_URL }/${ data.product }/reviews/${ data.user }`,
            }),
            providesTags: ( _result, _error, arg ) => [
                { type: "Review", id: arg.product },
            ],
        }),
        reviewProduct: builder.mutation<AddReview, ReviewProductArgs>({
            query: ( data ) => ({
                url: `${ PRODUCT_URL }/${ data.product }/reviews`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ( _result, _error, args) => [
                { type: 'Review', id: args.product },
                { type: 'Product', id: args.product },
            ],
        }),
    })
})

export const { useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useGetProductReviewsQuery,
    useGetProductReviewByUserQuery,
    useReviewProductMutation
} = productsApiSlice