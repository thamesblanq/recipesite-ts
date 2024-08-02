import { useState, useEffect } from "react";
import { useLoginMutation } from "@/features/auth/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, isError, error }] = useLoginMutation();
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const result = await login({ email, password }).unwrap();
            localStorage.setItem('session', JSON.stringify(result));
            navigate('/')
            window.location.reload(); // Refresh the page after successful login
        } catch (error) {
            console.error('Failed to login:', error);
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

    const content = (
        <div className="font-inter flex justify-center items-center h-screen">
            <div className="flex flex-col gap-4 p-4 m-4 w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl lg:text-3xl font-semibold mb-4">Login</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="flex flex-row items-center justify-center gap-x-4 w-full bg-black text-white py-2 rounded-lg hover:bg-black/95 transition duration-300"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                {isError && <p className="text-red-500 mt-2">{getErrorMessage(error as FetchBaseQueryError)}</p>}
                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );

    return content;
};

export default Login;
