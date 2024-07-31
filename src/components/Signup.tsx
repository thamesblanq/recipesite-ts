import { useState, useEffect } from "react";
import { useRegisterMutation } from "@/features/auth/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Link, useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [register, { isLoading, isError, error }] = useRegisterMutation();
    const navigate = useNavigate();
    const userId = ID.unique();

    useEffect(() => {
        // Check if a session already exists
        const cookie = localStorage.getItem('cookieFallback');
        if (cookie) {
            navigate('/');
        }
    }, [navigate]);

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            // Check if a session already exists
            const session = localStorage.getItem('user');
            if (session) {
                console.warn('Session already active');
                navigate('/');
                return;
            }

            const result = await register({ userId, email, password }).unwrap();
            // Store session information in localStorage or a state management store
            localStorage.setItem('session', JSON.stringify(result));
            navigate('/');
        } catch (err) {
            // Handle error type safely
            if (err && typeof err === 'object' && 'status' in err && 'data' in err) {
                const fetchError = err as FetchBaseQueryError;
                if (fetchError.status === 'CUSTOM_ERROR') {
                    console.error('Signup error:', fetchError.data);
                    alert(fetchError.data);
                } else {
                    console.error('Failed to signup:', fetchError);
                    alert('An unknown error occurred');
                }
            } else if (err instanceof Error) {
                console.error('Error:', err.message);
                alert('An error occurred: ' + err.message);
            } else {
                console.error('An unknown error occurred');
                alert('An unknown error occurred');
            }
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
        <div className="font-inter flex justify-center items-center h-screen bg-white text-black">
            <div className="flex flex-col gap-4 p-4 m-4 w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl lg:text-3xl font-semibold mb-4">Sign Up</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSignup}
                    disabled={isLoading}
                    className="flex flex-row items-center justify-center gap-x-4 w-full bg-black text-white py-2 rounded-lg hover:bg-black/95 transition duration-300"
                >
                    {isLoading ? 'Signing up...' : 'Sign Up'}
                </button>
                {isError && <p className="text-red-500 mt-2">{getErrorMessage(error as FetchBaseQueryError)}</p>}
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );

    return content;
};

export default Signup;
