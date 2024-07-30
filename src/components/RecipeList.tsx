import { useFetchRecipesQuery as useMealDbRecipesQuery } from '@/features/services/mealDbApi';
import { useFetchRecipesQuery } from '@/features/services/appwriteApi';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
  
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom';
import { Recipe } from '@/types';
//import SkeletonCard from './SkeletonCard';



const RecipeList = () => {
  const { data: mealDbRecipes, error: mealDbError, isLoading: isMealDbLoading } = useMealDbRecipesQuery();
  const { data: appwriteRecipes, error: appwriteError, isLoading: isAppwriteLoading } = useFetchRecipesQuery();

const hasAppwriteRecipes = Array.isArray(appwriteRecipes) && appwriteRecipes.length > 0 && appwriteError === undefined;
  
  // Combine recipes if Appwrite has recipes, otherwise use only MealDB recipes
  const combinedRecipes: Recipe[] = hasAppwriteRecipes 
    ? [...(mealDbRecipes || []), ...appwriteRecipes] 
    : mealDbRecipes || [];

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

  const content = (
    <>
    <div className="container mx-auto p-4 my-6">
      <h2 className="text-3xl font-bold mb-4">Recipe List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {combinedRecipes.map((recipe) => (
          <Card key={recipe.id} className="shadow-lg">
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{recipe.title}</CardTitle>
              <CardDescription>{recipe.instructions.slice(0, 100)}...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Badge>{recipe.area}</Badge>
                <Badge>{recipe.time}</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/recipe/${recipe.id}`}>
                <Button variant="outline">View Recipe</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    </>
  )

  return content;
};

export default RecipeList;
