import React, { useState } from 'react';
import { useUpdateEmailMutation, useUpdatePasswordMutation } from '@/features/auth/authApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useNavigate } from 'react-router-dom';

const UpdateUser: React.FC = () => {
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateEmail, { isLoading: isUpdatingEmail, error: emailError }] = useUpdateEmailMutation();
    const [updatePassword, { isLoading: isUpdatingPassword, error: passwordError }] = useUpdatePasswordMutation();
    const navigate = useNavigate();

    const handleUpdateEmail = async () => {
        if (!newEmail || !password) {
            alert('Email and password are required');
            return;
        }
        try {
            await updateEmail({ newEmail: newEmail, password }).unwrap();
            alert('Email updated successfully');
            navigate('/');
        } catch (err) {
            console.error('Failed to update email:', err);
            alert('Error updating email');
        }
    };

    const handleUpdatePassword = async () => {
        if (!password || !newPassword) {
            alert('Current password and new password are required');
            return;
        }
        try {
            await updatePassword({ newPassword, oldPassword: password }).unwrap();
            alert('Password updated successfully');
            navigate('/');
        } catch (err) {
            console.error('Failed to update password:', err);
            alert('Error updating password');
        }
    };

    const getErrorMessage = (error: FetchBaseQueryError | { message?: string }) => {
        if ('status' in error && 'data' in error) {
            return error.data as string;
        } else if ('message' in error) {
            return error.message;
        } else {
            return 'An unknown error occurred';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-4">Update Account</h1>

                <div className="mb-6">
                    <h2 className="text-xl font-medium mb-2">Update Email</h2>
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="New Email"
                        className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Current Password"
                        className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleUpdateEmail}
                        disabled={isUpdatingEmail}
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        {isUpdatingEmail ? 'Updating Email...' : 'Update Email'}
                    </button>
                    {emailError && <p className="text-red-500 mt-2">{getErrorMessage(emailError)}</p>}
                </div>

                <div>
                    <h2 className="text-xl font-medium mb-2">Update Password</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Current Password"
                        className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleUpdatePassword}
                        disabled={isUpdatingPassword}
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        {isUpdatingPassword ? 'Updating Password...' : 'Update Password'}
                    </button>
                    {passwordError && <p className="text-red-500 mt-2">{getErrorMessage(passwordError)}</p>}
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
