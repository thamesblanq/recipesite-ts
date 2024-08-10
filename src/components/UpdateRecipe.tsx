import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchRecipeByIdQuery, useUpdateRecipeMutation } from "../features/services/appwriteApi"

const UpdateRecipe: React.FC = () => {
    const { id: recipeId } = useParams<{ id: string }>();
    //console.log(`This is RecipeID: ${recipeId}`)
    const navigate = useNavigate();
    
    // Fetch the specific recipe details based on recipeId
    const { data: recipe, error: recipeError, isLoading: recipeLoading } = useFetchRecipeByIdQuery(recipeId || '');
    //console.log(recipe)

    const [updateRecipe] = useUpdateRecipeMutation();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [instructions, setInstructions] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [area, setArea] = useState('');
    const [youtube, setYoutube] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        if (recipe) {
            setTitle(recipe.title || '');
            setDescription(recipe.description || '');
            setIngredients(recipe.ingredients || []);
            setInstructions(recipe.instructions || '');
            setImageUrl(recipe.imageUrl || '');
            setCategory(recipe.category || '');
            setArea(recipe.area || '');
            setYoutube(recipe.youtube || '');
            setTime(recipe.time || '');
        }
    }, [recipe]);

    const formatDate = (date: Date): string => {
        return new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!recipeId) {
            console.error('Recipe ID is missing');
            return;
        }
        try {
            await updateRecipe({
                id: recipeId,
                data: {
                    title,
                    description,
                    ingredients,
                    instructions,
                    imageUrl,
                    category,
                    area,
                    youtube,
                    date: formatDate(new Date()),
                    time,
                },
            }).unwrap();
            alert('Recipe updated')
            navigate(`/recipe/${recipeId}`); // Redirect to recipe detail page or elsewhere after update
        } catch (error) {
            console.error('Failed to update recipe:', error);
        }
    };

    if (recipeLoading) return <div className="text-gray-500">Loading recipe...</div>;
    if (recipeError) return <div className="text-red-500">Error loading recipe</div>;

    return (
        <div className="container mx-auto p-4 mt-24">
            <h1 className="text-3xl font-bold mb-4">Update Recipe</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-lg font-semibold">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-lg font-semibold">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ingredients" className="block text-lg font-semibold">Ingredients</label>
                    <input
                        id="ingredients"
                        type="text"
                        value={ingredients.join(', ')}
                        onChange={(e) => setIngredients(e.target.value.split(',').map(item => item.trim()))}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="instructions" className="block text-lg font-semibold">Instructions</label>
                    <textarea
                        id="instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-lg font-semibold">Image URL</label>
                    <input
                        id="imageUrl"
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-lg font-semibold">Category</label>
                    <input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="area" className="block text-lg font-semibold">Area</label>
                    <input
                        id="area"
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="youtube" className="block text-lg font-semibold">YouTube</label>
                    <input
                        id="youtube"
                        type="text"
                        value={youtube}
                        onChange={(e) => setYoutube(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="time" className="block text-lg font-semibold">Time</label>
                    <input
                        id="time"
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Recipe</button>
            </form>
        </div>
    );
};

export default UpdateRecipe;
