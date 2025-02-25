import { Link } from "react-router-dom";

export function ProjectCard({ project }) {
  return (
    <Link
      key={project.id}
      to={`/projects/${project.id}`}
      state={project}
      className="block p-4 mb-4 bg-white rounded shadow hover:bg-gray-100"
    >
      <h1 className="text-xl font-bold">{project.name}</h1>
      <h3 className="text-gray-700">{project.description}</h3>
    </Link>
  );
}