import { Task, UserDetails } from "@/types";
import Card from "./Card";
import { GetUserById } from "@/app/api/user/handler";
import { useEffect, useState } from "react";

export function TaskCard(props: {
  data: Task;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const [collaborator, setCollaborator] = useState<UserDetails | null>(null);
  const task = props.data;
  const clr =
    task.priority < 10 ? "green" : task.priority < 20 ? "orange" : "red";

    useEffect(() => {
      const fetchTaskData = async () => {
        try {
          if (task.assigneeId) {
            const response = await GetUserById(task.assigneeId);
            console.log(response, response.content); /////////////////
            setCollaborator(response.content);
          }
        } catch (error) {
          console.error("Error fetching data[Tasks]:", error);
        }
      };
  
      fetchTaskData();
    }, [task.assigneeId]);

  return (
    <Card
      onContextMenu={props.onContextMenu}
      deadline={task.dueDate}
      name={task.title}
      clr={`bg-${clr}-500`}
      description={task.description}
      href={"#"}
    >
      {task.assigneeId && (
        <p className="text-wrap line-clamp-1">
          { collaborator?.username || task.assigneeId}
        </p>
      )}
      <div className="bg-green-500 w-0 h-0 opacity-0">@Kamath, y? pain?????</div>
      <div className="bg-red-500 w-0 h-0 opacity-0">@Kamath, y? pain?????</div>
      <div className="bg-orange-500 w-0 h-0 opacity-0">@Kamath, y? pain?????</div>
    </Card>
  );
}
