import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface NutritionalData {
    calories: number;
    totalWeight: number;
    carbs: number;
    protein: number;
    fat: number;
    // Add other fields as needed based on the API response
  }

export const nutritionApi = createApi({
  reducerPath: 'nutritionApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://world.openfoodfacts.org/api/v2/' }),
  endpoints: (builder) => ({
    fetchNutritionalData: builder.query<NutritionalData, string>({
      query: (barcode) => `product/${barcode}.json`,
    }),
  }),
});

export const { useFetchNutritionalDataQuery } = nutritionApi;
