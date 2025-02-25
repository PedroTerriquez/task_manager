import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TaskCard } from "./TaskCard";

export function ProjectShow() {
    const [data, setData ] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`/tasks/${id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ projectId: id }),
                    credentials: "include"
                });
                const result = await response.json();
                setData(result);
            } catch (err) {
                alert(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [id]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center">{state?.name}</h1>
                <h3 className="text-gray-700 text-center">{state?.description}</h3>
                <div className="flex justify-between">
                    <button
                        onClick={() => navigate("tasks/new")}
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Add Task
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                        Go back
                    </button>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {data ? (
                            data.map((project) => (
                                <TaskCard key={project.id} task={project} />
                            ))
                        ) : (
                            <h1 className="text-center">No data</h1>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}