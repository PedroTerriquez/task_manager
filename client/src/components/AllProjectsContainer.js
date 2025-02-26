import { useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { useNavigate } from "react-router-dom";

export function AllProjectsContainer() {
    const [data, setData ] = useState(null)
    const navigate = useNavigate();

    const fetchProjects = async () => {
        try {
            const response = await fetch("/projects", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            })
            const result = await response.json();
            setData(result);
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <>
            <div className='flex py-10 px-5 justify-between'>
                <h1 className="text-6xl font-bold mb-4 text-center">Your projects</h1>
                <button
                    onClick={() => navigate("/projects/new")}
                    className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Add Project
                </button>
            </div>
           <ul>
                {
                    data ? ( data?.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))) : (<h1>No data</h1>) 
                }
            </ul>
        </>
    )
}