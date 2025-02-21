import { useState } from "react";
import useAuthStore from '../store/authStore';


export function Login() {
    const [email, setEmail] = useState('user@email.com');
    const [password, setPassword] = useState("root");
    const [error, setError] = useState("");
    const { setLogin, setLogout } = useAuthStore();


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
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <h2>Login</h2>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
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
                    Login
                </button>
            </form>
        </div>
    );

}