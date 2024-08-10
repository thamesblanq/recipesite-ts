import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { account, ID } from '@/lib/appwrite';
import { User } from '@/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    login: builder.mutation<User, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        try {
          await account.createEmailPasswordSession(email, password);
          const user = await account.get(); // Ensure type assertion if necessary
          localStorage.setItem('user', JSON.stringify(user));
          return { data: user as User }; // Type assertion
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          return { error: { status: 500, data: errorMessage } as FetchBaseQueryError };
        }
      },
    }),
    register: builder.mutation<User, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        try {
          // Generate a unique userId using Appwrite's ID helper
          const userId = ID.unique(); 
    
          // Attempt to create the user with the generated userId, email, and password
          await account.create(userId, email, password);
    
          // Create a session immediately after registration
          await account.createEmailPasswordSession(email, password);
    
          // Fetch the user's details after successful registration
          const user = await account.get();
          localStorage.setItem('user', JSON.stringify(user));
    
          // Return the user data
          return { data: user as User };
    
        } catch (error) {
          // Handle the case where the user already exists (Appwrite will throw a conflict error)
          if (error && typeof error === 'object' && 'status' in error) {
            const fetchError = error as FetchBaseQueryError;
    
            if (fetchError.status === 409) {
              return {
                error: {
                  status: 409,
                  data: 'User with this email already exists. Please login instead.',
                } as FetchBaseQueryError,
              };
            }
          }
    
          // Handle other types of errors
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          return { error: { status: 500, data: errorMessage } as FetchBaseQueryError };
        }
      },
    }),
        
    fetchUser: builder.query<User, void>({
      queryFn: async () => {
        try {
          const user = JSON.parse(localStorage.getItem('user') || 'null') as User;
          if (user) {
            return { data: user };
          } else {
            throw new Error('No user found');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          return { error: { status: 500, data: errorMessage } as FetchBaseQueryError };
        }
      },
    }),
    updateEmail: builder.mutation<User, { newEmail: string; password: string }>({
      queryFn: async ({ newEmail, password }) => {
        try {
          await account.updateEmail(newEmail, password);
          const user = await account.get(); // Ensure type assertion if necessary
          localStorage.setItem('user', JSON.stringify(user));
          return { data: user as User }; // Type assertion
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          return { error: { status: 500, data: errorMessage } as FetchBaseQueryError };
        }
      },
    }),
    updatePassword: builder.mutation<void, { newPassword: string; oldPassword: string }>({
      queryFn: async ({ newPassword, oldPassword }) => {
        try {
          await account.updatePassword(newPassword, oldPassword);
          return { data: undefined }; // Use undefined to match the void type
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          return { error: { status: 500, data: errorMessage } as FetchBaseQueryError };
        }
      },
    }),
    deleteUser: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await account.updateStatus(); // This deletes the currently authenticated user
          localStorage.removeItem('user');
          return { data: undefined }; // Use undefined to match the void type
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          return { error: { status: 500, data: errorMessage } as FetchBaseQueryError };
        }
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await account.deleteSession('current');
          localStorage.removeItem('user');
          return { data: undefined }; // Use undefined to match the void type
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          return { error: { status: 500, data: errorMessage } as FetchBaseQueryError };
        }
      },
    }),
  }),
});

export const { 
  useLoginMutation, 
  useFetchUserQuery, 
  useLogoutMutation, 
  useRegisterMutation, 
  useUpdateEmailMutation, 
  useUpdatePasswordMutation, 
  useDeleteUserMutation 
} = authApi;
