import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Recipe } from '@/types';
import { useRemoveRecipeMutation } from '@/features/services/appwriteApi';
import { useFetchUserQuery } from '@/features/auth/authApi';
import RecipeCard from '@/components/RecipeCard';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface RecipeCardWithActionsProps {
    recipe: Recipe;
}

const RecipeCardWithActions: React.FC<RecipeCardWithActionsProps> = ({ recipe }) => {
    const [removeRecipe] = useRemoveRecipeMutation();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!recipe.id) {
            console.error('Recipe ID is missing');
            return;
        }
        try {
            await removeRecipe(recipe.id).unwrap();
            window.location.reload();
            navigate('/');
        } catch (error) {
            console.error('Failed to delete recipe:', extractErrorMessage(error as AppError));
        }
    };

    // Fetch user data without parameters
    const { data: fetchedUser } = useFetchUserQuery();
    const [currentUserId, setCurrentUserId] = useState<string | null>(fetchedUser?.$id || null);

    useEffect(() => {
        const checkUser = () => {
            const user = JSON.parse(localStorage.getItem('session') || 'null');
            setCurrentUserId(user?.$id || null);
        };

        window.addEventListener('storage', checkUser);

        return () => {
            window.removeEventListener('storage', checkUser);
        };
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('session') || 'null');
        setCurrentUserId(user?.$id || null);
    }, [fetchedUser]);

    // Error handling
    interface ErrorWithMessage {
        message?: string;
    }

    type AppError = FetchBaseQueryError | SerializedError | { status?: string; data?: ErrorWithMessage };

    const extractErrorMessage = (error: AppError): string => {
        if ('status' in error && error.status) {
            return `Error: ${error.status}`;
        }
        if ('data' in error && error.data) {
            return `Error: ${error.data}`;
        }
        return 'An unknown error occurred';
    };

    const isAuthor = recipe.userId === currentUserId && recipe.userId !== "";
    //console.log(`recipe id: ${recipe.userId}`)
    //console.log(`current userid: ${currentUserId}`)

    return (
        <div>
            <RecipeCard recipe={recipe} />
            {isAuthor && (
                <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-y-4">
                    <Link to={`/recipe/${recipe.id}/update`} className="bg-yellow-500 text-white p-2 rounded mr-2">
                        Update Recipe
                    </Link>
                    <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
                        Delete Recipe
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecipeCardWithActions;
