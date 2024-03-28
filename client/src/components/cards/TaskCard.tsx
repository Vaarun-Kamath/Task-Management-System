import { Task } from "@/types";
import { Dispatch, SetStateAction, useState, FocusEventHandler } from "react";
import Card from "./Card";
import ContextMenu from "../atoms/ContextMenu";
import { GrStatusDisabled } from "react-icons/gr";
import { MdGroups, MdLowPriority } from "react-icons/md";

export function TaskCard(props: {
  data: Task;
  setShowStatusModal: Dispatch<SetStateAction<false | Task>>;
  setShowPriorityModal: Dispatch<SetStateAction<false | Task>>;
  setShowCollabModal: Dispatch<SetStateAction<false | Task>>;
}) {
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const task = props.data;
  const clr =
    task.priority < 10 ? "green" : task.priority < 20 ? "orange" : "red";
  const handleBlur: FocusEventHandler<HTMLDivElement> | undefined = (event) => {
    setTimeout(() => setContextMenuPosition(null), 1_000);
  };
  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };
  return (
    <Card
      onContextMenu={handleContextMenu}
      deadline={task.dueDate}
      name={task.title}
      description={task.description}
      href={"#"}
    >
      <p className={`text-${clr}-500 font-semibold`}>
        {task.status} {task.priority}
      </p>
      {task.assigneeId && <p>{task.assigneeId}</p>}
      {contextMenuPosition && (
        <ContextMenu position={contextMenuPosition} onBlur={handleBlur}>
          <button
            className={
              "flex border-2 items-center gap-2 px-4 py-1 rounded-sm hover:bg-gray-700 hover:text-white transition-all duration-200 w-full"
            }
            onClick={() => {
              setContextMenuPosition(null);
              props.setShowStatusModal(task);
            }}
          >
            <span>
              <GrStatusDisabled />
            </span>
            Set Status
          </button>
          <button
            className={
              "flex border-2 items-center gap-2 px-4 py-1 rounded-sm hover:bg-gray-700 hover:text-white transition-all duration-200 w-full"
            }
            onClick={() => {
              setContextMenuPosition(null);
              props.setShowPriorityModal(task);
            }}
          >
            <span>
              <MdLowPriority />
            </span>
            Set Priority
          </button>
          <button
            className={
              "flex border-2 items-center gap-2 px-4 py-1 rounded-sm hover:bg-gray-700 hover:text-white transition-all duration-200 w-full"
            }
            onClick={() => {
              setContextMenuPosition(null);
              props.setShowCollabModal(task);
            }}
          >
            <span>
              <MdGroups />
            </span>
            Assign Collaborator
          </button>
        </ContextMenu>
      )}
    </Card>
  );
}
