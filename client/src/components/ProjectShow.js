import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import { useLayout } from "../LayoutProvider";
import { DroppableTaskContainer } from "./DroppableTaskContainer";

const statusEnum = {
    'todo': 1,
    'inprogress': 2,
    'inreview': 3,
    'done': 4
}

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
    const { socket } = useLayout();

    useEffect(() => {
        console.log('this is running twice could be strict mode issue not working on dev')
        const handleNewTask = (newTask) => {
            setTasksByStatus((prevTasksByStatus) => {
                const updatedTasksByStatus = { ...prevTasksByStatus };
                const alreadyExists = updatedTasksByStatus.todo.filter((task) => task.id === newTask.id);
                if (alreadyExists.length > 0) return updatedTasksByStatus;
                updatedTasksByStatus.todo.push(newTask);
                return updatedTasksByStatus;
            });
        };

        const handleUpdateTask = (updateTask) => {
            setTasksByStatus((prevTasksByStatus) => {
                const updatedTasksByStatus = { ...prevTasksByStatus };
                Object.keys(updatedTasksByStatus).forEach(column => {
                    const oldTask = updatedTasksByStatus[column].filter((task) => task.id === updateTask.id);
                    if (oldTask.length > 0) {
                        const position = updatedTasksByStatus[column].indexOf(oldTask[0]);
                        if (position !== -1)
                            updatedTasksByStatus[column].splice(position, 1);
                    }
                });
                updatedTasksByStatus[Object.keys(statusEnum)[updateTask.status - 1]].push(updateTask);
                return updatedTasksByStatus;
            });
        };

        socket.on("newTask", handleNewTask);
        socket.on("updateTask", handleUpdateTask);

        return () => {
            socket.off("newTask", handleNewTask);
            socket.off("updateTask", handleUpdateTask);
        };
    }, [socket]);

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
                    "todo": result.filter((task) => task.status === statusEnum['todo'] || task.status === null),
                    "inprogress": result.filter((task) => task.status === statusEnum['inprogress']),
                    "inreview": result.filter((task) => task.status === statusEnum['inreview']),
                    "done": result.filter((task) => task.status === statusEnum['done'])
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

    async function handleDragEnd(event) {
        const newColumn = event.over?.id
        if (statusEnum[newColumn] === event.active.data.current) return
        if (newColumn) {
            await fetch(`/tasks/${event.active.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: statusEnum[newColumn] }),
                credentials: "include"
            });
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
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
                            onClick={() => handleDestroy()}
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
                        <DroppableTaskContainer tasks={tasksByStatus['todo']} id='todo' />
                        <DroppableTaskContainer tasks={tasksByStatus['inprogress']} id='inprogress' />
                        <DroppableTaskContainer tasks={tasksByStatus['inreview']} id='inreview' />
                        <DroppableTaskContainer tasks={tasksByStatus['done']} id='done' />
                    </div>
                )}
            </div>
        </DndContext>
    );
}