import { Link } from 'react-router-dom';
import { Recipe } from '@/types';
import { Utensils, Clock3, Heart } from 'lucide-react';
import { useFetchUserQuery } from '@/features/auth/authApi';
import { useAddFavoriteRecipeMutation, useFetchFavoriteRecipesQuery } from '@/features/services/appwriteApi';
import MessageModal from './MessageModal';
import { useState, useEffect } from 'react';

interface RecipeCardProps {
  recipe: Recipe;
  showHeartButton?: boolean;  // Add a prop to control the heart button
}

const RecipeCard = ({ recipe, showHeartButton = true }: RecipeCardProps) => {
  const [addFavoriteRecipe] = useAddFavoriteRecipeMutation();
  const { data: fetchedUser } = useFetchUserQuery();
  const { data: favoriteRecipes } = useFetchFavoriteRecipesQuery(fetchedUser?.$id || '');
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [modalVisible, setModalVisible] = useState(false);

  const currentUserId = fetchedUser?.$id || '';

  useEffect(() => {
    if (favoriteRecipes && recipe) {
      const found = favoriteRecipes.some((fav: Recipe) => fav.id === recipe.id);
      setIsFavorite(found);
    }
  }, [favoriteRecipes, recipe]);

  const handleAddFavoriteRecipe = async () => {
    if (!recipe || !recipe.id) {
        setModalMessage('Recipe data is missing');
        setModalType('error');
        setModalVisible(true);
        return;
    }
    if (!currentUserId) {
        setModalMessage('User is not authorized to perform this action, please log in');
        setModalType('error');
        setModalVisible(true);
        return;
    }

    if (isFavorite) {
        setModalMessage('This recipe is already part of your favorites');
        setModalType('error');
        setModalVisible(true);
        return;
    }

    try {
        await addFavoriteRecipe({ userId: currentUserId, recipe }).unwrap();
        setModalMessage('Recipe added to favorites!');
        setModalType('success');
        setModalVisible(true);
    } catch (err) {
        console.log(err);
        setModalMessage('Failed to add to favorites: ' + (err as Error).message);
        setModalType('error');
        setModalVisible(true);
    }
  };

  const handleShareRecipe = (recipeId: string) => {
    const recipeUrl = `${window.location.origin}/recipe/${recipeId}`;
    navigator.clipboard.writeText(recipeUrl).then(() => {
      setModalMessage('Recipe Link copied to clipboard! You can now share it.');
      setModalType('success');
      setModalVisible(true);
    }).catch((error) => {
      setModalMessage('Something went wrong while trying to copy the Recipe Link');
      setModalType('error');
      setModalVisible(true);
      console.error('Error copying text: ', error);
    });
  };

  return (
    <>
      <div className="rounded-lg shadow-md overflow-hidden bg-[#E7F9FD] relative">
        <img src={recipe.imageUrl} alt={recipe.title} loading="lazy" className="w-full h-48 object-cover" />
        {showHeartButton && !isFavorite && (
          <div className="absolute top-4 right-4 py-1 px-1 rounded-md bg-white z-40 cursor-pointer" onClick={handleAddFavoriteRecipe}>
            <Heart className="cursor-pointer" />
          </div>
        )}
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
          <p className="text-gray-700 mb-4">{recipe.category}</p>
          <div className="flex my-4">
            <p className="p-2 font-semibold rounded-md flex flex-row gap-2 items-center">
              <Clock3 className="font-bold" />
              <span className="font-light">{recipe.time}</span>
            </p>
            <p className="p-2 font-semibold rounded-md flex flex-row gap-2 items-center">
              <Utensils className="font-bold" />
              <span className="font-light">{recipe.category}</span>
            </p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div>
              <Link to={`/recipe/${recipe.id}`} className="px-2 py-3 rounded-md text-white bg-black/95 font-semibold hover:underline">
                View Recipe
              </Link>
            </div>
            <div>
              <button onClick={() => handleShareRecipe(recipe.id)} className="px-2 py-3 rounded-md text-white bg-black/95 font-semibold hover:underline">
                Share Recipe
              </button>
            </div>
          </div>
        </div>
      </div>

      <MessageModal message={modalMessage || ''} type={modalType} visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

export default RecipeCard;
