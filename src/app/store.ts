
// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import recipeSlice  from "../features/recipe/recipeSlice"
import { mealDbApi } from '../features/services/mealDbApi';
import { useDispatch } from 'react-redux';
import { nutritionApi } from '@/features/services/nutritionApi';
import { authApi } from '@/features/auth/authApi';
import { youtubeApi } from '@/features/services/youtubeApi';


const store = configureStore({
  reducer: {
    recipes: recipeSlice,
    [mealDbApi.reducerPath]: mealDbApi.reducer,
    [nutritionApi.reducerPath]: nutritionApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mealDbApi.middleware, nutritionApi.middleware, authApi.middleware, youtubeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;

