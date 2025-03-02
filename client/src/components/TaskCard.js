import { Link } from "react-router-dom";
import { useDraggable } from "@dnd-kit/core";

export function TaskCard({ task }) {
  const statuses = ['To-do', 'in progress', 'on review', 'Done'];
  const statusesColors = ['text-green-600', 'text-yellow-600', 'text-blue-600', 'text-black-600'];
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: task.status
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div className='relative'>
      <Link
        to={`tasks/${task.id}`}
        state={task}
        className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full z-10">
        TICKET: {task?.id}
      </Link>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        key={task.id}
        className="relative block p-10 mb-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
      >
        <div
        >
          <h1 className="text-xl font-bold text-gray-900">{task.title}</h1>
          <h3 className="text-gray-700 mt-2">{task.description}</h3>
          <p className={`text-sm mt-2 ${statusesColors[task.status - 1]}`}>
            Status: {statuses[task.status - 1]}
          </p>

        </div>
      </div>
    </div>
  );
}