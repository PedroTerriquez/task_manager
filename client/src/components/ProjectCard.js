import { Link } from "react-router-dom";

export function ProjectCard({ project }) {
  return (
      <Link key={project.id} to={`/projects/${project.id}`} state={project}>
        <h1>{project.name}</h1>
        <h3>{project.description}</h3>
      </Link>
  );
}