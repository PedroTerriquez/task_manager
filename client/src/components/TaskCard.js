import { Link } from "react-router-dom";

export function TaskCard({ task }) {
  return (
    <Link
      key={task.id}
      to={`tasks/${task.id}`}
      state={task}
      className="relative block p-6 mb-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
    >
      <span className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
        ID: {task?.id}
      </span>
      <h1 className="text-xl font-bold text-gray-900">{task.title}</h1>
      <h3 className="text-gray-700 mt-2">{task.description}</h3>
      <p className={`text-sm mt-2 ${task.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
        Status: {task.status}
      </p>
    </Link>
  );
}