
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchRecipesQuery, useRemoveRecipeMutation } from '@/features/services/appwriteApi';

const DeleteRecipe: React.FC = () => {
    const { recipeId } = useParams<{ recipeId: string }>();
    const navigate = useNavigate();
    const { data: recipes, error: recipeError } = useFetchRecipesQuery();
    const [deleteRecipe] = useRemoveRecipeMutation();

    const handleDelete = async () => {
        if (!recipeId) {
            console.error('Recipe ID is required');
            return;
        }
        try {
            await deleteRecipe(recipeId).unwrap();
            navigate('/'); // Redirect to home or other relevant page
        } catch (error) {
            console.error('Failed to delete recipe:', error);
        }
    };

    const recipe = recipes?.find((item) => item.id === recipeId);

    if (recipeError) return <div className="text-red-500">Error loading recipe</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Delete Recipe</h1>
            {recipe ? (
                <div>
                    <h2 className="text-2xl font-semibold">{recipe.title}</h2>
                    <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete Recipe</button>
                </div>
            ) : (
                <div className="text-red-500">Recipe not found</div>
            )}
        </div>
    );
};

export default DeleteRecipe;
