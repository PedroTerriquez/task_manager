import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TaskCard } from "./TaskCard";

export function ProjectShow() {
    const [data, setData ] = useState(null)
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
                })
                const result = await response.json();
                setData(result);
            } catch (err) {
                alert(err)
            }
        }

        fetchTasks();
    }, [id]);


    return (
        <>
            <h1>{state?.name}</h1>
            <h3>{state?.description}</h3>
            <button onClick={() => navigate("tasks/new")}>Add Task</button>
            <button onClick={() => navigate("/")}>Cancel</button>
            <ul>
                {
                    data ? ( data?.map(project => (
                        <TaskCard task={project} />
                    ))) : (<h1>No data</h1>) 
                }
            </ul>
        </>
    )
}