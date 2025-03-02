import { useState, useEffect } from "react";
import useAuthStore from '../store/authStore';
import { useNavigate } from "react-router-dom";

export function Profile() {
    const { setName } = useAuthStore();
    const [name, setNameState ] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/users", {
                    method: "GET",
                    credentials: "include"
                });
                const data = await response.json();
                setEmail(data.email);
                setNameState(data.name);
                setProjects(data.projects);
            } catch (err) {
                setError('Failed to fetch user data');
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch("/users/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Failed to update user information");
            }

            const data = await response.json();
            setName(data.name);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Profile</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setNameState(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Update
                    </button>
                </form>

                <h3 className="text-xl font-bold text-center mt-6">Projects</h3>
                <ul className="space-y-2">
                    {projects.map((project) => (
                        <li key={project.id} className="p-4 bg-gray-200 rounded">
                            <h4 className="text-lg font-bold">{project.name}</h4>
                            <p>{project.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}