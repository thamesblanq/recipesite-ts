import { useParams } from 'react-router-dom';
import { useFetchRecipesQuery as useMealDbRecipesQuery } from '@/features/services/mealDbApi';
import { useFetchRecipesQuery } from '@/features/services/appwriteApi';
//import RecipeCard from './RecipeCard';
import RecipeCardWithActions from './RecipeCardWithActions';
import { Recipe } from '@/types';

const CategoryPage = () => {
    const { category } = useParams<{ category: string }>();
    const { data: mealDbRecipes, error: mealDbError, isLoading: isMealDbLoading } = useMealDbRecipesQuery();
    const { data: appwriteRecipes, error: appwriteError, isLoading: isAppwriteLoading } = useFetchRecipesQuery();
  
    const combinedRecipes: Recipe[] = [
      ...(mealDbRecipes || []).filter((recipe) => recipe.category === category),
      ...(appwriteRecipes || []).filter((recipe) => recipe.category === category)
    ];
  
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
  
      return <p className='text-white'>Error fetching recipes in categorypage: {errorMessage}</p>;
    }
  
  
    if (combinedRecipes.length === 0) {
      return <p className='text-white'>Category is empty</p>;
    }
  

  const content = (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-24 p-4">
      {combinedRecipes.map((recipe) => (
        <RecipeCardWithActions key={recipe.id} recipe={recipe} />
      ))}
    </div>
    </>
  )

  return content
};

export default CategoryPage;
