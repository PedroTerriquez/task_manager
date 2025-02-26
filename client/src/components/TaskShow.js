import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function TaskShow() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const [title, setTitle] = useState(state?.title);
    const [description, setDescription] = useState(state?.description);
    const [status, setStatus] = useState(parseInt(state?.status));
    const projectId = state?.projectId;

    const handleDelete = async () => {
        try {
            const response = await fetch(`/tasks/${state?.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to delete the task");
            }

            navigate(-1);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/tasks/${state?.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, status, projectId}),
            });
            
            if (!response.ok) {
                throw new Error("Failed to update the task");
            }

            navigate(-1);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    >
                        Back
                    </button>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-2xl font-bold text-center border-none focus:outline-none focus:border-blue-500"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full text-gray-700 text-center border-b-2 border-none focus:outline-none focus:border-blue-500"
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(parseInt(e.target.value))}
                    className="w-full text-gray-700 text-center border-b-2 border-none focus:outline-none focus:border-blue-500"
                >
                    <option value="1">To do</option>
                    <option value="2">In Progress</option>
                    <option value="3">Review</option>
                    <option value="4">Done</option>
                </select>
                <div className="flex justify-between">
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Save Updates
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                        Delete Task
                    </button>
                </div>
            </div>
        </div>
    );
}