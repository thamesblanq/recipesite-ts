import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchUserQuery, useUpdateUserMutation } from '@/features/services/appwriteApi';


const UpdateUser: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { data: user, error: userError } = useFetchUserQuery(userId!);
    const [updateUser] = useUpdateUserMutation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateUser({
                userId: userId!,
                userData: { name, email },
            }).unwrap();
            // Handle successful update (e.g., redirect)
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    if (!userId) {
        return <div className="text-red-500">User ID is required</div>;
    }

    if (userError) {
        return <div className="text-red-500">Error loading user data</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Update Account</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="p-2 border rounded w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="p-2 border rounded w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Account</button>
            </form>
        </div>
    );
};

export default UpdateUser;
