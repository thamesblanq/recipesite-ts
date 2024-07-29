import { useParams } from 'react-router-dom';
import { useFetchRecipesQuery } from '@/features/services/mealDbApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import RecipeCard from './RecipeCard';
import { Recipe } from '@/types';

const CategoryPage = () => {
    const { category } = useParams<{ category: string }>();
    const { data: mealDbRecipes } = useFetchRecipesQuery();
    const appwriteRecipes = useSelector((state: RootState) =>
      state.recipes.recipes.filter((recipe) => recipe.category === category)
    );
  
    const combinedRecipes: Recipe[] = [
      ...(mealDbRecipes || []).filter((recipe) => recipe.category === category),
      ...appwriteRecipes,
    ];

  const content = (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-24 p-4">
      {combinedRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
    </>
  )

  return content
};

export default CategoryPage;
