// src/components/RecipeList.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFetchRecipesQuery } from '../features/services/mealDbApi';
import { RootState, useAppDispatch } from '@/app/store';
import { setRecipes } from '../features/recipe/recipeSlice';
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
//import SkeletonCard from './SkeletonCard';



const RecipeList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: recipes, error, isLoading } = useFetchRecipesQuery();
  const storedRecipes = useSelector((state: RootState) => state.recipes.recipes);

  useEffect(() => {
    if (recipes) {
      dispatch(setRecipes(recipes));
    }
  }, [recipes, dispatch]);

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) {
    const errorMessage = 'status' in error
      ? `Error: ${error.status} - ${JSON.stringify(error.data)}`
      : error.message;

    return <div className="flex justify-center items-center h-screen">{errorMessage}</div>;
  }

  const content = (
    <>
    <div className="container mx-auto p-4 my-6">
      <h2 className="text-3xl font-bold mb-4">Recipe List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {storedRecipes.map((recipe) => (
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
