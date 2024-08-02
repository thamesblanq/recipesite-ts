// src/components/RecipeDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchRecipesQuery as useMealDbRecipesQuery } from '@/features/services/mealDbApi';
import { useFetchRecipesQuery } from '@/features/services/appwriteApi';
import { useFetchUserQuery } from '@/features/auth/authApi';
import { Clock3, Utensils, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import NutritionalData from './NutritionalData';
import { Recipe } from '@/types';

const RecipeDetail = () => {
  const { data: user } = useFetchUserQuery();
  const { id } = useParams<{ id: string }>();
  const { data: mealDbRecipes, error: mealDbError, isLoading: isMealDbLoading } = useMealDbRecipesQuery();
  const { data: appwriteRecipes, error: appwriteError, isLoading: isAppwriteLoading } = useFetchRecipesQuery();

  const userId = user?.$id

  const handleShareRecipe = (recipeId: string) => {
    const recipeUrl = `${window.location.origin}/recipe/${recipeId}`;
    navigator.clipboard.writeText(recipeUrl).then(() => {
      alert('Recipe link copied to clipboard! You can now share it.');
    }).catch((error) => {
      console.error('Error copying text: ', error);
    });
  };

  const hasAppwriteRecipes = Array.isArray(appwriteRecipes) && appwriteRecipes.length > 0 && appwriteError === undefined;

  const combinedRecipes: Recipe[] = hasAppwriteRecipes 
    ? [...(mealDbRecipes || []), ...appwriteRecipes] 
    : mealDbRecipes || [];

  const recipe = combinedRecipes.find((item) => item.id === id);
  const foundUser = combinedRecipes.find((item) => item.userId === userId)
  const email = foundUser ? user?.email : "John Doe"

  const navigate = useNavigate();
  //const date = `${new Date().getDate()} / ${new Date().getMonth() + 1} / ${new Date().getFullYear()}`;

  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleCheckboxChange = (ingredient: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  if (isMealDbLoading && isAppwriteLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (appwriteError || mealDbError) {
    let errorMessage: string | undefined = "An unknown error occurred";
    
    if (appwriteError) {
      console.log('Appwrite Error:', appwriteError); // Log Appwrite error
      if ('status' in appwriteError) {
        // Handle FetchBaseQueryError
        errorMessage = `Appwrite Error ${appwriteError.status}: ${appwriteError.data}`;
      } else if ('message' in appwriteError) {
        // Handle SerializedError
        errorMessage = `Appwrite Error: ${appwriteError.message}`;
      }
    } 
    if (mealDbError) {
      console.log('MealDB Error:', mealDbError); // Log MealDB error
      if ('status' in mealDbError) {
        // Handle FetchBaseQueryError
        errorMessage = `MealDB Error ${mealDbError.status}: ${mealDbError.data}`;
      } else if ('message' in mealDbError) {
        // Handle SerializedError
        errorMessage = `MealDB Error: ${mealDbError.message}`;
      }
    }

    return <div className="flex justify-center items-center h-screen">{errorMessage}</div>;
  }

  const content = !recipe ? (
    <div className="flex justify-center items-center h-screen font-inter">Recipe not found.</div>
  ) : (
    <>
      <div className="mx-auto p-4 font-inter my-6 mt-24">
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-10/12 md:w-8/12 lg:w-10/12 xl:w-8/12 mx-auto p-2">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{recipe.title}</h2>
          <div className="flex flex-row justify-between items-center gap-x-4 my-2 lg:w-3/5">
            <div className="flex flex-col items-center">
              <img src={recipe.imageUrl} alt={recipe.title} className="w-12 h-12 object-cover rounded-full border border-slate-950" />
              <div className="text-center mt-2">
                <h2 className="text-xs font-bold">{email}</h2>
                <h2 className="text-xs">{recipe.date}</h2>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Clock3 />
              <div className="text-center mt-2">
                <h2 className="text-xs font-bold">PREP TIME</h2>
                <h2 className="text-xs">{recipe.time}</h2>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Clock3 />
              <div className="text-center mt-2">
                <h2 className="text-xs font-bold">COOK TIME</h2>
                <h2 className="text-xs">{recipe.time}</h2>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Utensils />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            {recipe.youtube ? (
              <iframe
                width="100%"
                height="360"
                src={getYouTubeEmbedUrl(recipe.youtube)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
                className="w-full lg:w-2/3 rounded-xl"
              ></iframe>
            ) : (
              <h1 className="flex justify-center items-center h-screen">
                {`The video ${recipe.youtube} could not be found or it no longer exists`}
              </h1>
            )}
            <NutritionalData ingredients={recipe.ingredients.join(', ')} />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside mb-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center mb-2 border-b border-gray-300 pb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={checkedIngredients.includes(ingredient)}
                    onChange={() => handleCheckboxChange(ingredient)}
                  />
                  <span
                    className={`${
                      checkedIngredients.includes(ingredient) ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {ingredient}
                  </span>
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold mb-2 mt-4">Directions for cooking:</h3>
            <p className="text-gray-700 mb-4">{recipe.instructions}</p>
            <div className='flex flex-col md:flex-row md:justify-between gap-x-4 md:items-center gap-y-4'>
              <button
                onClick={() => handleShareRecipe(recipe.id)}
                className="flex flex-row items-center justify-center gap-x-4 w-full bg-black text-white text-center py-2 rounded-lg hover:bg-black/95 transition duration-300"
              >
                Share Recipe
                <ArrowRight />
              </button>
              <button
                onClick={() => navigate('/recipe')}
                className="flex flex-row items-center justify-center gap-x-4 w-full bg-black text-white text-center py-2 rounded-lg hover:bg-black/95 transition duration-300"
              >
                Back to Recipe List
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return content;
};

export default RecipeDetail;
