import { TaskCard } from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

export function DroppableTaskContainer(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        color: isOver ? "white" : undefined,
        background: isOver ? 'green': undefined,
        border: isOver ? "2px solid green" : "2px solid black",
    };
    return(
        <ul ref={setNodeRef} style={style} className="space-y-4 width-full bg-gray-300 p-4 rounded">
            <h1 className="text-center">{props.id} {props.tasks?.length}</h1>
            { props.tasks ? (
                props.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))
            ) : (
                <h1 className="text-center">No data</h1>
            )}
        </ul>
    )
}