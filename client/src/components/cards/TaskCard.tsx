import { Task, UserDetails } from "@/types";
import Card from "./Card";
import { GetUserById } from "@/app/api/user/handler";
import { useEffect, useState } from "react";
import DynamicSwatch from "../atoms/DynamicSwatch";
import { getColour } from "@/utils/helperFunctions";

export function TaskCard(props: {
  data: Task;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const [collaborator, setCollaborator] = useState<UserDetails | null>(null);
  const task = props.data;
  const clr = getColour(task.priority);

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
        <p className="text-md text-gray-500 hover:text-gray-300 ml-2 text-wrap line-clamp-1">
          {"Assignee: " + collaborator?.username || task.assigneeId}
        </p>
      )}
      <DynamicSwatch />
    </Card>
  );
}
