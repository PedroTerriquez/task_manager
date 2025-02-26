import { Link } from "react-router-dom";

export function TaskCard({ task }) {
  const statuses = ['To-do', 'in progress', 'on review', 'Done'];
  const statusesColors = ['text-green-600', 'text-yellow-600', 'text-blue-600', 'text-black-600'];
  return (
    <Link
      key={task.id}
      to={`tasks/${task.id}`}
      state={task}
      className="relative block p-6 mb-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
    >
      <span className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
        TICKET: {task?.id}
      </span>
      <h1 className="text-xl font-bold text-gray-900">{task.title}</h1>
      <h3 className="text-gray-700 mt-2">{task.description}</h3>
      <p className={`text-sm mt-2 ${statusesColors[task.status-1]}` }>
        Status: {statuses[task.status-1]}
        Status: {task.status}
      </p>
    </Link>
  );
}