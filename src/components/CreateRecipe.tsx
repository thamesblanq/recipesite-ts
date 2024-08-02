// src/pages/CreateRecipe.tsx
import React, { useState } from 'react';
import { useAddRecipeMutation } from '@/features/services/appwriteApi';
import { useNavigate } from 'react-router-dom';
import { ID } from 'appwrite';

const CreateRecipe: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [instructions, setInstructions] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [area, setArea] = useState('');
    const [youtube, setYoutube] = useState('');
    const [time, setTime] = useState('');
    const [addRecipe] = useAddRecipeMutation();
    const navigate = useNavigate();

    const formatDate = (date: Date): string => {
        return new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addRecipe({
                id: ID.unique(), // Use a unique ID generator here
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
            }).unwrap();
            alert('Recipe created')
            window.location.reload()
            navigate('/'); // Redirect to home or other relevant page
        } catch (error) {
            console.error('Failed to create recipe:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 mt-24">
            <h1 className="text-3xl font-bold mb-4">Create Recipe</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields for recipe details */}
                <input type="text" placeholder="Title" className="p-2 border rounded w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Description" className="p-2 border rounded w-full" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder="Ingredients (comma-separated)" className="p-2 border rounded w-full" value={ingredients.join(', ')} onChange={(e) => setIngredients(e.target.value.split(','))} />
                <textarea placeholder="Instructions" className="p-2 border rounded w-full" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
                <input type="text" placeholder="Image URL" className="p-2 border rounded w-full" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <input type="text" placeholder="Category" className="p-2 border rounded w-full" value={category} onChange={(e) => setCategory(e.target.value)} />
                <input type="text" placeholder="Area" className="p-2 border rounded w-full" value={area} onChange={(e) => setArea(e.target.value)} />
                <input type="text" placeholder="YouTube Link" className="p-2 border rounded w-full" value={youtube} onChange={(e) => setYoutube(e.target.value)} />
                <input type="text" placeholder="Cooking Time eg 30 mins" className="p-2 border rounded w-full" value={time} onChange={(e) => setTime(e.target.value)} />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Recipe</button>
            </form>
        </div>
    );
};

export default CreateRecipe;
