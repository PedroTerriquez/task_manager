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
        <>
            <h1>{state?.title}</h1>
            <h3>{state?.description}</h3>
            <button onClick={() => navigate(-1)}>Go back</button>
            <button onClick={handleDelete}>Delete Task</button>
        </>
    );
}