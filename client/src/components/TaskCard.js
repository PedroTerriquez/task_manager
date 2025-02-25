import { Link } from "react-router-dom";

export function TaskCard({ task }) {
  return (
      <Link key={task.id} to={`tasks/${task.id}`} state={task}>

        <p>ID: {task?.id}</p>
        <h1>Title: {task.title}</h1>
        <h3>Description: {task.description}</h3>
        <p>{task.status}</p>
      </Link>
  );
}