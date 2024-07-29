import { Link } from 'react-router-dom';
import { Recipe } from '@/types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {

    const content = (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover"/>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
                <p className="text-gray-700 mb-4">{recipe.category}</p>
                <Link to={`/recipe/${recipe.id}`} className="text-blue-500 hover:underline">
                View Recipe
                </Link>
            </div>
            </div>
        </>
    )
  return content
};

export default RecipeCard;
