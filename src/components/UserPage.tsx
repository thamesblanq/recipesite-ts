import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchFavoriteRecipesQuery, useFetchUserCreatedRecipesQuery, useRemoveFavoriteRecipeMutation } from '@/features/services/appwriteApi';
import { useFetchUserQuery } from '@/features/auth/authApi';
import RecipeCardWithActions from '@/components/RecipeCardWithActions';
import FavoriteCard from '@/components/FavoriteCard';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Recipe } from '@/types';

const UserPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();

    const { data: user, error: userError, isLoading: userLoading } = useFetchUserQuery();
    const { data: favoriteRecipes, error: favoriteError, isLoading: favoriteLoading } = useFetchFavoriteRecipesQuery(userId || '');
    const { data: createdRecipes, error: createdError, isLoading: createdLoading } = useFetchUserCreatedRecipesQuery(userId || '');

    // Initialize the mutation hook
    const [removeFavoriteRecipe] = useRemoveFavoriteRecipeMutation();

    const [favorites, setFavorites] = useState<Recipe[]>(favoriteRecipes || []);

    const handleRemoveRecipe = async (recipeId: string) => {
        try {
            const userId = localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')!).$id : null;
            if (!userId) {
                throw new Error('User ID not found');
            }

            // Trigger the mutation
            await removeFavoriteRecipe({ userId, recipeId }).unwrap();
            
            // Update the UI by removing the recipe from the list
            setFavorites(favorites.filter(recipe => recipe.id !== recipeId));
        } catch (error) {
            console.error('Failed to remove favorite recipe:', error);
        }
    };

    const extractErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
        if ('status' in error && error.status) {
            return `Error: ${error.status}`;
        }
        if ('data' in error && error.data) {
            return `Error: ${error.data}`;
        }
        return 'An unknown error occurred';
    };

    if (userLoading || favoriteLoading || createdLoading) {
        return <div className="text-gray-500">Loading...</div>;
    }

    if (userError) {
        return <div className="text-red-500">Error loading user data: {extractErrorMessage(userError)}</div>;
    }
    if (favoriteError) {
        return <div className="text-red-500">Error loading favorite recipes: {extractErrorMessage(favoriteError)}</div>;
    }
    if (createdError) {
        return <div className="text-red-500">Error loading created recipes: {extractErrorMessage(createdError)}</div>;
    }

    if (!userId) {
        return <div className="text-red-500">User ID is missing</div>;
    }

    return (
        <div className="container mx-auto p-4 mt-24">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold">{user?.email}'s Page</h1>
                <p className="text-lg text-gray-600">Email: {user?.email}</p>
            </header>

            <div className="mb-8 text-center">
                <Link to={`/recipe/create`} className="bg-blue-500 text-white p-2 rounded mr-2">Create Recipe</Link>
                <Link to={`/user/${userId}/update`} className="bg-green-500 text-white p-2 rounded mr-2">Update Account</Link>
                <Link to={`/user/${userId}/delete`} className="bg-red-500 text-white p-2 rounded">Delete Account</Link>
            </div>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Favorite Recipes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {favorites.length ? (
                        favorites.map(recipe => (
                            <FavoriteCard key={recipe.id} recipe={recipe} onRemove={handleRemoveRecipe} />
                        ))
                    ) : (
                        <div className="text-gray-500">No favorite recipes found</div>
                    )}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Created Recipes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {createdRecipes?.length ? (
                        createdRecipes.map(recipe => (
                            <RecipeCardWithActions key={recipe.id} recipe={recipe} />
                        ))
                    ) : (
                        <div className="text-gray-500">No recipes created yet</div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default UserPage;
