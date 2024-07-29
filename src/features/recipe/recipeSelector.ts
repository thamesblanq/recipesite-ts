import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

export const selectRecipeCategories = createSelector(
  (state: RootState) => state.recipes.recipes,
  (recipes) => {
    const categories = recipes.map((recipe) => recipe.category);
    return Array.from(new Set(categories));
  }
);
