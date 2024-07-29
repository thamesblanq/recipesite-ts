import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Link } from 'react-router-dom';
import { useFetchRecipesQuery } from '@/features/services/mealDbApi';

const CategoryButtons: React.FC = () => {
  const { data: mealDbRecipes, error, isLoading } = useFetchRecipesQuery();

  const mealDbCategories = useMemo(() => {
    return mealDbRecipes ? mealDbRecipes.map(recipe => recipe.category) : [];
  }, [mealDbRecipes]);

  const appwriteCategories = useSelector((state: RootState) => {
    return state.recipes.recipes.map(recipe => recipe.category);
  });

  const combinedCategories = useMemo(() => {
    return Array.from(new Set([...mealDbCategories, ...appwriteCategories]));
  }, [mealDbCategories, appwriteCategories]);

/*   useEffect(() => {
    console.log("MealDB Categories:", mealDbCategories);
    console.log("Appwrite Categories:", appwriteCategories);
    console.log("Combined Categories:", combinedCategories);
  }, [mealDbCategories, appwriteCategories, combinedCategories]); */

  if (isLoading) return <p className='text-white'>Loading categories...</p>;
  if (error) return <p className='text-white'>Error loading categories</p>;

  if (combinedCategories.length === 0) {
    return <p className='text-white'>Category is empty</p>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {combinedCategories.map((category) => (
        <Link key={category} to={`/category/${category}`} className="btn bg-blue-500 text-white px-4 py-2 rounded">
          {category}
        </Link>
      ))}
    </div>
  );
};

export default CategoryButtons;
