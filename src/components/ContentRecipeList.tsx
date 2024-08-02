//import RecipeCard from "./RecipeCard";
import RecipeCardWithActions from "./RecipeCardWithActions";
import { Recipe } from "@/types";
import { useFetchRecipesQuery  } from "@/features/services/appwriteApi";
import { useFetchRecipesQuery as useMealDbRecipesQuery } from "@/features/services/mealDbApi";

const ContentRecipeList = () => {
  const { data: mealDbRecipes, error: mealDbError, isLoading: isMealDbLoading } = useMealDbRecipesQuery();
  const { data: appwriteRecipes, error: appwriteError, isLoading: isAppwriteLoading } = useFetchRecipesQuery();

  // Determine if recipes are available from Appwrite
  const hasAppwriteRecipes = Array.isArray(appwriteRecipes) && appwriteRecipes.length > 0 && appwriteError === undefined;

  // Combine recipes if Appwrite has recipes, otherwise use only MealDB recipes
  const combinedRecipes: Recipe[] = hasAppwriteRecipes 
    ? [...(mealDbRecipes || []), ...appwriteRecipes] 
    : mealDbRecipes || [];

  //const combinedRecipes: Recipe[] = mealDbRecipes || []
  // Get the first 12 recipes
  const first12Recipes = combinedRecipes.slice(0, 12);

  // Handle loading and error states
  if (isMealDbLoading || isAppwriteLoading) return <p>Loading...</p>;

  if ( mealDbError || appwriteError ) {
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

    // If there is an error with Appwrite, display only MealDB recipes
    return <p>Error fetching recipes in contentrecipelist: {errorMessage}</p>;
}


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-24 mb-10">
      {first12Recipes.map((recipe) => (
        <RecipeCardWithActions key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default ContentRecipeList;