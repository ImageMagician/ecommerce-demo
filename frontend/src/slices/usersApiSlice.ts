import { USERS_URL } from '../constants';
import { apiSlice }  from "./apiSlice";

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
    })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useProfileMutation } = usersApiSlice;