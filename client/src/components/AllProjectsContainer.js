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
            <h1>Your projects</h1>
            <button onClick={() => navigate("/projects/new")}>Add Project</button>
            <ul>
                {
                    data ? ( data?.map(project => (
                        <ProjectCard project={project} />
                    ))) : (<h1>No data</h1>) 
                }
            </ul>
        </>
    )
}