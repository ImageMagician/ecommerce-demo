import { USERS_URL } from '../constants';
import { apiSlice }  from "./apiSlice";

import type { User, UserUpdate } from "../types.ts";

interface LoginInfo {
    email: string;
    password: string;
}

interface RegisterInfo {
    email: string;
    password: string;
    name: string;
    isAdmin: boolean;
}

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginInfo, { email: string; password: string; }>({
            query: ( data ) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation<RegisterInfo, { email: string; password: string; name: string; isAdmin: boolean }>({
            query: ( data ) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        profile: builder.mutation({
            query: ( data ) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        getAllUsers: builder.query<User[], void>({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: [ 'User' ],
            keepUnusedDataFor: 5,
        }),
        getUserById: builder.query({
            query: ( userId ) => ({
                url: `${ USERS_URL }/${ userId }`,
            }),
            providesTags: [ 'User' ],
            keepUnusedDataFor: 5,
        }),
        updateUserById: builder.mutation<User, UserUpdate>({
            query: ( data ) => ({
                url: `${ USERS_URL }/${ data._id }`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: [ 'User' ],
        }),
        deleteUserById: builder.mutation({
            query: ( userId ) => ({
                url: `${ USERS_URL }/${ userId }`,
                method: 'DELETE',
            }),
            invalidatesTags: [ 'User' ],
        })
    })
});

export const { useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useProfileMutation,
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserByIdMutation,
    useDeleteUserByIdMutation,
} = usersApiSlice;