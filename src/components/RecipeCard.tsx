import { Link } from 'react-router-dom';
import { Recipe } from '@/types';
import { Utensils, Clock3 } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {

    const content = (
        <>
            <div className="rounded-lg shadow-md overflow-hidden bg-[#E7F9FD] p-2">
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover"/>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
                <p className="text-gray-700 mb-4">{recipe.category}</p>
                <div className='flex flex-row gap-x-4 my-4'>
                  <p className='p-2 bg-slate-300 font-semibold rounded-md flex flex-row gap-2 items-center'>
                    <Clock3 />
                    <span>{recipe.time}</span>
                  </p>
                  <p className='p-2 bg-slate-300 font-semibold rounded-md flex flex-row gap-2 items-center'>
                    <Utensils />
                    <span>{recipe.category}</span>
                  </p>
                </div>
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
