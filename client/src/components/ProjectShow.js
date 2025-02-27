import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TaskCard } from "./TaskCard";

export function ProjectShow() {
    const [tasksByStatus, setTasksByStatus] = useState({
        "todo": [],
        "inprogress": [],
        "inreview": [],
        "done": []
    });
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
                const groupedTasks = {
                    "todo": result.filter((task) => task.status === 1 || task.status === ""),
                    "inprogress": result.filter((task) => task.status === 2),
                    "inreview": result.filter((task) => task.status === 3),
                    "done": result.filter((task) => task.status === 4)
                }
                setTasksByStatus(groupedTasks);
            } catch (err) {
                alert(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [id]);

    const handleDestroy = async () => {
        try {
            const response = await fetch(`/projects/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (response.ok) {
                navigate(-1);
            }
        } catch (err) {
            alert(err);
        }

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded shadow-md py-10 mb-6 border-4 ">
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                    &lt; Back
                </button>
                <h1 className="text-5xl font-bold text-center">{state?.name}</h1>
                <h3 className="text-gray-700 text-center">{state?.description}</h3>
                <div id='header' className="flex justify-between border-gray-200">
                    <button
                        onClick={() => navigate("tasks/new")}
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Add Task
                    </button>
                    <button
                        onClick={ () => handleDestroy() }
                        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                        Destroy Project
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
            ) : (
                <div className='flex gap-9'>
                    <ul className="space-y-4 width-full bg-gray-300 p-4 rounded">
                        <h1 className="text-center">TODO {tasksByStatus['todo'].length}</h1>
                        {tasksByStatus['todo'] ? (
                            tasksByStatus['todo'].map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))
                        ) : (
                            <h1 className="text-center">No data</h1>
                        )}
                    </ul>
                    <ul className="space-y-4 width-full bg-gray-300 p-4 rounded">
                        <h1 className="text-center">In Progress {tasksByStatus['inprogress'].length}</h1>
                        {tasksByStatus['inprogress'] ? (
                            tasksByStatus['inprogress'].map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))
                        ) : (
                            <h1 className="text-center">No data</h1>
                        )}
                    </ul>
                    <ul className="space-y-4 width-full bg-gray-300 p-4 rounded">
                        <h1 className="text-center">In Review {tasksByStatus['inreview'].length}</h1>
                        {tasksByStatus['inreview'] ? (
                            tasksByStatus['inreview'].map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))
                        ) : (
                            <h1 className="text-center">No data</h1>
                        )}
                    </ul>
                    <ul className="space-y-4 width-full bg-gray-300 p-4 rounded">
                        <h1 className="text-center">DONE {tasksByStatus['done'].length}</h1>
                        {tasksByStatus['done'] ? (
                            tasksByStatus['done'].map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))
                        ) : (
                            <h1 className="text-center">No data</h1>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}