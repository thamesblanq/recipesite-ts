import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { databases } from '@/lib/appwrite';
import { Recipe, CustomErrorForAppwrite, AppwriteDocument, UserFavorite } from '@/types';
import { Query } from 'appwrite';

const databaseId = '66a8015a00304cd2a18a';
const collectionId = '66a801bd0027adf1756d'; 
const userFavoritesCollectionId = '66a96db00024359778ac'; 

const mapDocumentToRecipe = (doc: AppwriteDocument): Recipe => ({
    id: doc.$id,
    userId: doc.userId || '', 
    title: doc.title || '',
    description: doc.description || '',
    ingredients: doc.ingredients || [],
    instructions: doc.instructions || '',
    imageUrl: doc.imageUrl || '',
    category: doc.category || '',
    area: doc.area || '', 
    youtube: doc.youtube || '',
    time: doc.time || '',
});

const mapDocumentToUserFavorite = (doc: AppwriteDocument): UserFavorite => ({
    userId: doc.userId || '',
    recipeId: doc.$id || '', 
});

const getUserIdFromLocalStorage = (): string | null => {
    const user = localStorage.getItem('session');
    if (user) {
        try {
            const parsedUser = JSON.parse(user);
            console.log(parsedUser.$id);
            return parsedUser.$id || null; 
        } catch (e) {
            console.error('Error parsing user from localStorage:', e);
            return null;
        }
    }
    return null;
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
                    const userId = getUserIdFromLocalStorage();
                    if (!userId) {
                        return { error: { status: 'CUSTOM_ERROR', error: 'User ID not found' } };
                    }

                    // Add userId to recipe
                    const recipeWithUserId = { ...recipe, userId };

                    const response = await databases.createDocument(databaseId, collectionId, recipeWithUserId.id, recipeWithUserId);
                    return { data: mapDocumentToRecipe(response) };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', error: (error as CustomErrorForAppwrite).error } };
                }
            },
        }),
        removeRecipe: builder.mutation<string, string>({
            queryFn: async (recipeId) => {
                try {
                    if (!recipeId) {
                        throw new Error('Recipe ID is required');
                    }
                    await databases.deleteDocument(databaseId, collectionId, recipeId);
                    return { data: recipeId };
                } catch (error) {
                    console.error('Error deleting recipe:', error);
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
        //fetch recipe by ID
        fetchRecipeById: builder.query<Recipe, string>({
            queryFn: async (id) => {
                try {
                    const response = await databases.getDocument(databaseId, collectionId, id);
                    const recipe = mapDocumentToRecipe(response as AppwriteDocument);
                    return { data: recipe };
                } catch (error) {
                    console.error('Error fetching recipe by ID:', error);
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
                        Query.equal('userId', userId) // Use 'userId' field to filter recipes created by the user
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
    useUpdateRecipeMutation,  
    useFetchFavoriteRecipesQuery,
    useAddFavoriteRecipeMutation,
    useRemoveFavoriteRecipeMutation,
    useFetchUserCreatedRecipesQuery,
    useFetchRecipeByIdQuery 
} = appwriteApi;
