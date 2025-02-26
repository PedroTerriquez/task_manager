import { Link } from "react-router-dom";

export function ProjectCard({ project }) {
  return (
    <Link
      key={project.id}
      to={`/projects/${project.id}`}
      state={project}
      className="block p-6 mb-4 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <h1 className="text-xl font-bold text-gray-900">{project.name}</h1>
      <h3 className="text-gray-700 mt-2">{project.description}</h3>
    </Link>
  );
}