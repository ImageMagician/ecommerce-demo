import { USERS_URL } from '../constants';
import { apiSlice }  from "./apiSlice";

interface UserInfo {
    _id: string;
    email: string;
    name: string;
    isAdmin: boolean;
}

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserInfo, { _id: string; email: string; name: string; isAdmin: boolean }>({
            query: ( data ) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        })
    })
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;