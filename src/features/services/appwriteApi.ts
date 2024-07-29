// src/features/services/appwriteApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { databases } from '@/lib/appwrite';
import { Recipe, CustomErrorForAppwrite, AppwriteDocument } from '@/types';

const databaseId = '66a8015a00304cd2a18a';
const collectionId = '66a801bd0027adf1756d';


const mapDocumentToRecipe = (doc: AppwriteDocument): Recipe => {
    return {
      id: doc.$id,
      title: doc.title || '', // Provide default values if necessary
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

export const appwriteApi = createApi({
    reducerPath: 'appwriteApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }), // Base URL is not used in fetchBaseQuery for RTK Query
    endpoints: (builder) => ({
      fetchRecipes: builder.query<Recipe[], void>({
        queryFn: async () => {
            try {
                const response = await databases.listDocuments(databaseId, collectionId);
                
                // Ensure the response.documents are of type AppwriteDocument
                const documents = response.documents as unknown as AppwriteDocument[];
                const recipes = documents.map(mapDocumentToRecipe);
                
                return { data: recipes };
          } catch (error) {
            console.error('Error fetching recipes:', error); // Log error for debugging
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
    }),
  });
  

export const { useFetchRecipesQuery, useAddRecipeMutation, useRemoveRecipeMutation } = appwriteApi;
