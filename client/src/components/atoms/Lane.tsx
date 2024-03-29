import { useState } from "react";
import { ProjectType, Task } from "@/types";
import { TaskCard } from "../cards/TaskCard";
import TaskContextMenu from "./TaskContextMenu";
import { TaskCollab } from "../modals/addTaskCollabModal";
import { TaskPriority } from "../modals/addTaskPriority";
import { TaskStatus } from "../modals/addTaskStatus";

export default function Lane(props: {
  title: string;
  tasks: Array<Task>;
  project: ProjectType | null;
}) {
  const [contextMenuTask, setContextMenuTask] = useState<Task>();

  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [showStatusModal, setShowStatusModal] = useState<false | Task>(false);
  const [showPriorityModal, setShowPriorityModal] = useState<false | Task>(
    false
  );
  const [showCollabModal, setShowCollabModal] = useState<false | Task>(false);

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement>,
    task: Task
  ) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setContextMenuTask(task);
  };

  return (
    <>
      {showStatusModal && (
        <TaskStatus
          setShowModal={() => setShowStatusModal(false)}
          task={showStatusModal}
        />
      )}
      {showPriorityModal && (
        <TaskPriority
          setShowModal={() => setShowPriorityModal(false)}
          task={showPriorityModal}
        />
      )}
      {showCollabModal && props.project && (
        <TaskCollab
          setShowModal={() => setShowCollabModal(false)}
          task={showCollabModal}
          project={props.project}
        />
      )}
      <div className="w-full h-screen flex flex-col bg-gray-50 border-gray-200 border rounded-md p-5 gap-3">
        <h1 className="text-center font-semibold">{props.title}</h1>
        {props.tasks
          .filter((task) => task.status === props.title)
          .sort((taskA, taskB) => taskB.priority - taskA.priority)
          .map((task, index) => (
            <>
              <TaskCard
                data={task}
                key={index}
                onContextMenu={(event) => handleContextMenu(event, task)}
              />
              {contextMenuPosition && contextMenuTask && (
                <TaskContextMenu
                  contextMenuPosition={contextMenuPosition}
                  setContextMenuPosition={setContextMenuPosition}
                  setShowStatusModal={setShowStatusModal}
                  setShowPriorityModal={setShowPriorityModal}
                  setShowCollabModal={setShowCollabModal}
                  task={contextMenuTask}
                />
              )}
            </>
          ))}
      </div>
    </>
  );
}
