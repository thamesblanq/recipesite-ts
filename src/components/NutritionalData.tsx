// src/components/NutritionalData.tsx
import React from 'react';
import { useFetchNutritionalDataQuery } from '../features/services/nutritionApi';

interface NutritionalDataProps {
  ingredients: string;
}

const NutritionalData: React.FC<NutritionalDataProps> = ({ ingredients }) => {
  const { data: nutritionalData, error: nutritionError, isLoading: nutritionLoading } = useFetchNutritionalDataQuery(ingredients);
  console.log(nutritionalData);

  if (nutritionLoading) {
    return <p>Loading nutritional information...</p>;
  }

  if (nutritionError || !nutritionalData) {
    return <p>Info not found</p>;
  }

  return (
    <div className="bg-[#E7FAFE] p-4 rounded-lg shadow-md w-full lg:w-1/3 font-inter">
      <h3 className="text-xl font-semibold mb-2">Nutritional Information:</h3>
      <div className="mb-4">
        <p className='flex items-center mb-2 border-b border-gray-300 pb-2'>{`Calories: ${nutritionalData.calories !== undefined ? nutritionalData.calories : 0}g`}</p>
        <p className='flex items-center mb-2 border-b border-gray-300 pb-2'>{`Total weight: ${nutritionalData.totalWeight !== undefined ? nutritionalData.totalWeight : 0}g`}</p>
        <p className='flex items-center mb-2 border-b border-gray-300 pb-2'>{`Carbohydrate: ${nutritionalData.carbs !== undefined ? nutritionalData.carbs : 0}g`}</p>
        <p className='flex items-center mb-2 border-b border-gray-300 pb-2'>{`Proteins: ${nutritionalData.protein !== undefined ? nutritionalData.protein : 0}g`}</p>
        <p className='flex items-center mb-2 border-b border-gray-300 pb-2'>{`Fat: ${nutritionalData.fat !== undefined ? nutritionalData.fat : 0}g`}</p>
      </div>
    </div>
  );
};

export default NutritionalData;
