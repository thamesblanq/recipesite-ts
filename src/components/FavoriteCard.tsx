import React from 'react';
import { Recipe } from '@/types';
import { useRemoveFavoriteRecipeMutation } from '@/features/services/appwriteApi';
import RecipeCard from './RecipeCard';

interface FavoriteCardProps {
  recipe: Recipe;
  onRemove: (recipeId: string) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ recipe, onRemove }) => {
  const [removeFavoriteRecipe] = useRemoveFavoriteRecipeMutation();

  const handleRemoveFavorite = async () => {
    try {
      const userId = localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')!).$id : null;
      if (!userId) {
        throw new Error('User ID not found');
      }

      await removeFavoriteRecipe({ userId, recipeId: recipe.id }).unwrap();
      onRemove(recipe.id);  // Update the UI by removing the recipe from the list
      window.location.reload();
    } catch (error) {
      console.error('Failed to remove favorite recipe:', error);
    }
  };

  return (
    <div>
      <RecipeCard recipe={recipe} showHeartButton={false} /> {/* Disable the heart button */}
      <div className="mt-2 flex justify-center">
        <button onClick={handleRemoveFavorite} className="bg-red-500 text-white p-2 rounded">Remove from Favorites</button>
      </div>
    </div>
  );
};

export default FavoriteCard;
