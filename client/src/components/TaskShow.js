import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function TaskShow() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center">{state?.title}</h1>
                <h3 className="text-gray-700 text-center">{state?.description}</h3>
                <div className="flex justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Go back
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