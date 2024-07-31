import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeleteUserMutation } from '@/features/services/appwriteApi';

const DeleteUser: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [deleteUser] = useDeleteUserMutation();
    const navigate = useNavigate();
    const session = localStorage.getItem('user');

    const handleDelete = async () => {
        if (!userId) {
            console.error('User ID is required');
            return;
        }
        try {
            await deleteUser(userId).unwrap();
            if (session !== null) {
                localStorage.removeItem(session);
            }
            navigate('/'); // Redirect to home or other relevant page
        } catch (error) {
            console.error('Failed to delete user account:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Delete Account</h1>
            <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete Account</button>
        </div>
    );
};

export default DeleteUser;
