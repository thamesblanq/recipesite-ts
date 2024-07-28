// src/services/mealDbApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  imageUrl: string;
  category: string,
  area: string,
  youtube: string,
  time: string,
}

interface MealDBResponse {
  meals: Array<{
    idMeal: string;
    strMeal: string;
    strInstructions: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string,
    strYoutube: string
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strIngredient11: string;
    strIngredient12: string;
    strIngredient13: string;
    strIngredient14: string;
    strIngredient15: string;
    strIngredient16: string;
    strIngredient17: string;
    strIngredient18: string;
    strIngredient19: string;
    strIngredient20: string;
  }>;
}

export const mealDbApi = createApi({
  reducerPath: 'mealDbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.themealdb.com/api/json/v1/1' }),
  endpoints: (builder) => ({
    fetchRecipes: builder.query<Recipe[], void>({
      query: () => 'search.php?s=',
      transformResponse: (response:  MealDBResponse) =>
        response.meals.map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          ingredients: [
            meal.strIngredient1,
            meal.strIngredient2,
            meal.strIngredient3,
            meal.strIngredient4,
            meal.strIngredient5,
            meal.strIngredient6,
            meal.strIngredient7,
            meal.strIngredient8,
            meal.strIngredient9,
            meal.strIngredient10,
            meal.strIngredient11,
            meal.strIngredient12,
            meal.strIngredient13,
            meal.strIngredient14,
            meal.strIngredient15,
            meal.strIngredient16,
            meal.strIngredient17,
            meal.strIngredient18,
            meal.strIngredient19,
            meal.strIngredient20,
          ].filter(Boolean),
          instructions: meal.strInstructions,
          imageUrl: meal.strMealThumb,
          category: meal.strCategory,
          youtube: meal.strYoutube,
          area: meal.strArea,
          time: "30 mins"
        })),
    }),
  }),
});

export const { useFetchRecipesQuery } = mealDbApi;
