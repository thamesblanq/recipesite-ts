import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { account } from '@/lib/appwrite';
import { User } from '@/types';


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    login: builder.mutation<User, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        try {
          await account.createEmailPasswordSession(email, password);
          const user: User = await account.get();
          localStorage.setItem('user', JSON.stringify(user));
          
          return { data: user };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          return { error: { status: 'CUSTOM_ERROR', data: errorMessage } as FetchBaseQueryError };
        }
      },
    }),
    register: builder.mutation<User, { userId: string; email: string; password: string }>({
      queryFn: async ({ userId, email, password }) => {
        try {
          await account.create(userId, email, password);
          await account.createSession(email, password);
          const user: User = await account.get();
          localStorage.setItem('user', JSON.stringify(user));
          return { data: user };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          return { error: { status: 'CUSTOM_ERROR', data: errorMessage } as FetchBaseQueryError };
        }
      },
    }),
    fetchUser: builder.query<User, void>({
      queryFn: async () => {
        try {
          const user: User = JSON.parse(localStorage.getItem('user') || 'null');
          if (user) {
            return { data: user };
          } else {
            throw new Error('No user found');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          return { error: { status: 'CUSTOM_ERROR', data: errorMessage } as FetchBaseQueryError };
        }
      },
    }),
    logout: builder.mutation<null, void>({
      queryFn: async () => {
        try {
          await account.deleteSession('current');
          localStorage.removeItem('user');
          return { data: null };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          return { error: { status: 'CUSTOM_ERROR', data: errorMessage } as FetchBaseQueryError };
        }
      },
    }),
  }),
});

export const { useLoginMutation, useFetchUserQuery, useLogoutMutation, useRegisterMutation } = authApi;
