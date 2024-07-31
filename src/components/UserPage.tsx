import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchUserQuery, useFetchFavoriteRecipesQuery, useFetchUserCreatedRecipesQuery } from '@/features/services/appwriteApi';
import RecipeCard from '@/components/RecipeCard';

const UserPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();

    const { data: user, error: userError, isLoading: userLoading } = useFetchUserQuery(userId || '');
    const { data: favoriteRecipes, error: favoriteError, isLoading: favoriteLoading } = useFetchFavoriteRecipesQuery(userId || '');
    const { data: createdRecipes, error: createdError, isLoading: createdLoading } = useFetchUserCreatedRecipesQuery(userId || '');

    if (userLoading || favoriteLoading || createdLoading) {
        return <div className="text-gray-500">Loading...</div>;
    }

    if (userError || favoriteError || createdError) {
        return <div className="text-red-500">Error loading data</div>;
    }

    if (!userId) {
        return <div className="text-red-500">User ID is missing</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold">{user?.name}'s Page</h1>
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
                    {favoriteRecipes && favoriteRecipes.length > 0 ? (
                        favoriteRecipes.map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))
                    ) : (
                        <div className="text-gray-500">No favorite recipes found</div>
                    )}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Created Recipes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {createdRecipes && createdRecipes.length > 0 ? (
                        createdRecipes.map(recipe => (
                            <div key={recipe.id}>
                                <RecipeCard recipe={recipe} />
                                <Link to={`/recipe/${recipe.id}/update`} className="bg-yellow-500 text-white p-2 rounded mt-2 block">Update Recipe</Link>
                            </div>
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
