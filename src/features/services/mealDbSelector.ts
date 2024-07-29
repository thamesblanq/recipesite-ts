import { createSelector } from "@reduxjs/toolkit";
import { mealDbApi } from "./mealDbApi";

export const selectMealDbCategories = createSelector(
    mealDbApi.endpoints.fetchRecipes.select(),
    (recipesResult) => {
        if(recipesResult.data) {
            const categoreies = recipesResult.data.map((recipe) => recipe.category)
            return Array.from(new Set(categoreies))
        }
        return []
    }
)