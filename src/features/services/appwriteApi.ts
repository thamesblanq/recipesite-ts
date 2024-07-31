import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { databases } from '@/lib/appwrite';
import { Recipe, CustomErrorForAppwrite, AppwriteDocument, User, AppwriteUser, UserFavorite } from '@/types';
import { Query } from 'appwrite';

const databaseId = '66a8015a00304cd2a18a';
const collectionId = '66a801bd0027adf1756d';
const usersCollectionId = '66a95c4b000e11ed1589'; // Replace with your actual Users Collection ID
const userFavoritesCollectionId = '66a96db00024359778ac'; // Replace with your actual User Favorites Collection ID

const mapDocumentToRecipe = (doc: AppwriteDocument): Recipe => {
    return {
        id: doc.$id,
        title: doc.title || '',
        description: doc.description || '',
        ingredients: doc.ingredients || [],
        instructions: doc.instructions || '',
        imageUrl: doc.imageUrl || '',
        category: doc.category || '',
        area: doc.area,
        youtube: doc.youtube,
        time: doc.time,
    };
};

const mapDocumentToUser = (doc: AppwriteUser): User => {
    return {
        id: doc.$id,
        email: doc.email || '',
        name: doc.name || '',
    };
};

const mapDocumentToUserFavorite = (doc: AppwriteDocument): UserFavorite => {
    return {
        userId: doc.userId || '', // Ensure fallback to empty string if userId is undefined
        recipeId: doc.$id || '', // Ensure fallback to empty string if recipeId is undefined
    };
};

export const appwriteApi = createApi({
    reducerPath: 'appwriteApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        // Recipe endpoints
        fetchRecipes: builder.query<Recipe[], void>({
            queryFn: async () => {
                try {
                    const response = await databases.listDocuments(databaseId, collectionId);
                    const documents = response.documents as unknown as AppwriteDocument[];
                    const recipes = documents.map(mapDocumentToRecipe);
                    return { data: recipes };
                } catch (error) {
                    console.error('Error fetching recipes:', error);
                    return { error: { status: 'CUSTOM_ERROR', error: (error as CustomErrorForAppwrite).error } };
                }
            },
        }),
        addRecipe: builder.mutation<Recipe, Recipe>({
            queryFn: async (recipe) => {
                try {
                    const response = await databases.createDocument(databaseId, collectionId, recipe.id, recipe);
                    return { data: mapDocumentToRecipe(response) };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', error: (error as CustomErrorForAppwrite).error } };
                }
            },
        }),
        removeRecipe: builder.mutation<string, string>({
            queryFn: async (recipeId) => {
                try {
                    await databases.deleteDocument(databaseId, collectionId, recipeId);
                    return { data: recipeId };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', error: (error as CustomErrorForAppwrite).error } };
                }
            },
        }),
        updateRecipe: builder.mutation<Recipe, { id: string; data: Partial<Recipe> }>({
            queryFn: async ({ id, data }) => {
                try {
                    const response = await databases.updateDocument(databaseId, collectionId, id, data);
                    return { data: mapDocumentToRecipe(response as AppwriteDocument) };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', error: (error as CustomErrorForAppwrite).error } };
                }
            },
        }),

        // User endpoints
        fetchUser: builder.query<User, string>({
          queryFn: async (userId) => {
              if (!userId) {
                  return { error: { status: 'CUSTOM_ERROR', error: 'User ID is required' } };
              }
              try {
                  const response = await databases.getDocument(databaseId, usersCollectionId, userId);
                  const user = mapDocumentToUser(response as AppwriteUser);
                  return { data: user };
              } catch (error) {
                  console.error('Error fetching user:', error);
                  return { error: { status: 'CUSTOM_ERROR', error: (error as CustomErrorForAppwrite).error } };
              }
          },
      }),
      updateUser: builder.mutation<User, { userId: string; userData: Partial<User> }>({
          queryFn: async ({ userId, userData }) => {
              if (!userId || !userData) {
                  return { error: { status: 'CUSTOM_ERROR', error: 'Invalid input' } };
              }
              try {
                  const response = await databases.updateDocument(databaseId, usersCollectionId, userId, userData);
                  return { data: mapDocumentToUser(response as AppwriteUser) };
              } catch (error) {
                  return { error: { status: 'CUSTOM_ERROR', error: (error as CustomErrorForAppwrite).error } };
              }
          },
      }),
      deleteUser: builder.mutation<string, string>({
        queryFn: async (userId) => {
            if (!userId) {
                return { error: { status: 'CUSTOM_ERROR', error: 'User ID is required' } };
            }
            try {
                await databases.deleteDocument(databaseId, usersCollectionId, userId);
                return { data: userId };
            } catch (error) {
                return { error: { status: 'CUSTOM_ERROR', error: (error as CustomErrorForAppwrite).error } };
            }
        },
    }),
    

        // Favorite recipes endpoints
        fetchFavoriteRecipes: builder.query<Recipe[], string>({
            queryFn: async (userId) => {
                if (!userId) {
                    return { error: { status: 'CUSTOM_ERROR', error: 'User ID is required' } };
                }
                try {
                    const response = await databases.listDocuments(databaseId, userFavoritesCollectionId);
                    const documents = response.documents as unknown as AppwriteDocument[];
                    const userFavorites = documents
                        .map(mapDocumentToUserFavorite)
                        .filter(favorite => favorite.userId === userId);
                    
                    // Fetch the recipes based on userFavorites
                    const recipeIds = userFavorites.map(favorite => favorite.recipeId);
                    const recipesPromises = recipeIds.map(recipeId => databases.getDocument(databaseId, collectionId, recipeId));
                    const recipesResponses = await Promise.all(recipesPromises);
                    const recipes = recipesResponses.map(response => mapDocumentToRecipe(response as AppwriteDocument));
                    
                    return { data: recipes };
                } catch (error) {
                    console.error('Error fetching favorite recipes:', error);
                    return { error: { status: 'CUSTOM_ERROR', error: (error as CustomErrorForAppwrite).error } };
                }
            },
        }),
        addFavoriteRecipe: builder.mutation<void, { userId: string; recipeId: string }>({
            queryFn: async ({ userId, recipeId }) => {
                if (!userId || !recipeId) {
                    return { error: { status: 'CUSTOM_ERROR', error: 'User ID and Recipe ID are required' } };
                }
                try {
                    await databases.createDocument(databaseId, userFavoritesCollectionId, '', { userId, recipeId });
                    return { data: undefined };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', error: (error as CustomErrorForAppwrite).error } };
                }
            },
        }),
        removeFavoriteRecipe: builder.mutation<void, { userId: string; recipeId: string }>({
            queryFn: async ({ userId, recipeId }) => {
                if (!userId || !recipeId) {
                    return { error: { status: 'CUSTOM_ERROR', error: 'User ID and Recipe ID are required' } };
                }
                try {
                    const response = await databases.listDocuments(databaseId, userFavoritesCollectionId, [
                        Query.equal('userId', userId),
                        Query.equal('recipeId', recipeId)
                    ]);
                    const documentId = response.documents[0]?.$id;
                    if (documentId) {
                        await databases.deleteDocument(databaseId, userFavoritesCollectionId, documentId);
                        return { data: undefined };
                    }
                    return { error: { status: 'CUSTOM_ERROR', error: 'Favorite not found' } };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', error: (error as CustomErrorForAppwrite).error } };
                }
            },
        }),

        // Fetch recipes created by a user
        fetchUserCreatedRecipes: builder.query<Recipe[], string>({
            queryFn: async (userId) => {
                if (!userId) {
                    return { error: { status: 'CUSTOM_ERROR', error: 'User ID is required' } };
                }
                try {
                    const response = await databases.listDocuments(databaseId, collectionId, [
                        Query.equal('createdBy', userId) // Assuming 'createdBy' is the field for user ID
                    ]);
                    const documents = response.documents as unknown as AppwriteDocument[];
                    const recipes = documents.map(mapDocumentToRecipe);
                    return { data: recipes };
                } catch (error) {
                    console.error('Error fetching created recipes:', error);
                    return { error: { status: 'CUSTOM_ERROR', error: (error as CustomErrorForAppwrite).error } };
                }
            },
        }),
    }),
});

export const { 
    useFetchRecipesQuery, 
    useAddRecipeMutation, 
    useRemoveRecipeMutation, 
    useUpdateRecipeMutation,  // Export the new mutation hook
    useFetchUserQuery, 
    useUpdateUserMutation, 
    useDeleteUserMutation,
    useFetchFavoriteRecipesQuery,
    useAddFavoriteRecipeMutation,
    useRemoveFavoriteRecipeMutation,
    useFetchUserCreatedRecipesQuery 
} = appwriteApi;
