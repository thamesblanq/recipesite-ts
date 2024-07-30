import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFetchRecipesQuery as useMealDbRecipesQuery } from '@/features/services/mealDbApi';
import { useFetchRecipesQuery } from '@/features/services/appwriteApi';

const CategoryButtons: React.FC = () => {
  const { data: mealDbRecipes, error: mealDbError, isLoading: isMealDbLoading } = useMealDbRecipesQuery();
  const { data: appwriteRecipes, error: appwriteError, isLoading: isAppwriteLoading } = useFetchRecipesQuery();

  const mealDbCategories = useMemo(() => {
    return mealDbRecipes ? mealDbRecipes.map(recipe => recipe.category) : [];
  }, [mealDbRecipes]);

  const appwriteCategories = useMemo(() => {
    if (Array.isArray(appwriteRecipes) && appwriteRecipes.length > 0 && !appwriteError) {
      return appwriteRecipes.map(recipe => recipe.category);
    }
    return [];
  }, [appwriteRecipes, appwriteError]);

  const combinedCategories = useMemo(() => {
    return Array.from(new Set([...mealDbCategories, ...appwriteCategories]));
  }, [mealDbCategories, appwriteCategories]);

  if (isMealDbLoading || isAppwriteLoading) return <p className='text-white'>Loading...</p>;

  if (mealDbError || appwriteError) {
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

    return <p className='text-white'>Error fetching recipes: {errorMessage}</p>;
  }


  if (combinedCategories.length === 0) {
    return <p className='text-white'>Category is empty</p>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {combinedCategories.map((category) => (
        <Link key={category} to={`/category/${category}`} className="btn bg-blue-500 text-white px-4 py-2 rounded">
          {category}
        </Link>
      ))}
    </div>
  );
};

export default CategoryButtons;
