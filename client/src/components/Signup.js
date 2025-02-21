import { useState } from "react";
import useAuthStore from '../store/authStore';

export function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { setLogin } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch("/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name}),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Signup failed");
            }

            setLogin();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Signup</h2>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">
                    Signup
                </button>
            </form>
        </div>
    );
}
