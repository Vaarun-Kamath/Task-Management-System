import { Task } from "@/types";
import Card from "./Card";

export function TaskCard(props: {
  data: Task;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const task = props.data;
  const clr =
    task.priority < 10 ? "green" : task.priority < 20 ? "orange" : "red";

  return (
    <Card
      onContextMenu={props.onContextMenu}
      deadline={task.dueDate}
      name={task.title}
      description={task.description}
      href={"#"}
    >
      <p className={`text-${clr}-500 font-semibold`}>
        {task.status} {task.priority}
      </p>
      {task.assigneeId && (
        <p className="text-wrap line-clamp-1">{task.assigneeId}</p>
      )}
    </Card>
  );
}
