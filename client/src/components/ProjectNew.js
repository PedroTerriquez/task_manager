import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProjectNew() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name, description })
            });
            if (response.ok) {
                navigate("/");
            }
        } catch (err) {
            console.error("Error adding project", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Create Project</button>
            <button onClick={()=> navigate('/')}>Cancel</button>
        </form>
    );
}