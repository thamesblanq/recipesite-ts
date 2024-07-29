import RecipeCard from "./RecipeCard";
import { useFetchRecipesQuery } from "@/features/services/mealDbApi";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Recipe } from "@/types";

const ContentRecipeList = () => {

    const { data: mealDbRecipes, error, isLoading } = useFetchRecipesQuery();
    const appwriteRecipes = useSelector((state: RootState) => state.recipes.recipes);
  
    const combinedRecipes: Recipe[] = [
      ...(mealDbRecipes || []),
      ...appwriteRecipes,
    ];

    //first 12 recipes to view
    const first12Recipes = combinedRecipes.slice(0, 12);

    if (isLoading) return <p>Loading...</p>;
    if (error) {
        let errorMessage: string | undefined = "An unknown error occurred";
        if ('status' in error) {
          // Handle FetchBaseQueryError
          errorMessage = `Error ${error.status}: ${error.data}`;
        } else if ('message' in error) {
          // Handle SerializedError
          errorMessage = error.message;
        }
        return <p>Error fetching recipes: {errorMessage}</p>;
    }

    const content = (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-24 mb-10">
          {first12Recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        </>
      )
  return content
}

export default ContentRecipeList