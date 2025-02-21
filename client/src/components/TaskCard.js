import { Link } from "react-router-dom";

export function TaskCard({ task }) {
  return (
      <Link to={`tasks/${task.id}`} state={task}>
        <h1>{task.title}</h1>
        <h3>{task.description}</h3>
        <p>{task.status}</p>
      </Link>
  );
}