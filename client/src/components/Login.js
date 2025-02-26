import { useState } from "react";
import useAuthStore from '../store/authStore';
import { useNavigate } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState('user@email.com');
    const [password, setPassword] = useState("root");
    const [error, setError] = useState("");
    const { setLogin, setLogout } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });

            if (!response.ok) {
                setLogout();
                throw new Error("Invalid email or password");
            }

            setLogin();
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <div className="flex justify-center space-x-4">
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                    <h2 className="text-2xl font-bold text-center text-gray-400">/</h2>
                    <h2 onClick={() => navigate('/signup')} className="text-2xl font-bold text-center text-gray-400">Signup</h2>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}