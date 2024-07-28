import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Recipe {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string;
    imageUrl: string;
    category: string,
    area?: string,
    youtube?: string,  
    time?: string,
}

export interface RecipeState {
    recipes: Recipe[]
}

const initialState: RecipeState = {
    recipes: []
}

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        addRecipe: (state, action: PayloadAction<Recipe>) => {
            state.recipes.push(action.payload)
        },
        removeRecipe: (state, action: PayloadAction<string>) => {
            state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload)
        },
        setRecipes: (state, action:PayloadAction<Recipe[]>) => {
            state.recipes = action.payload
        }
    }
})

export const { addRecipe, removeRecipe, setRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;