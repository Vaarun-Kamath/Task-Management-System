import { UpdateTask } from "@/app/api/task/handler";
import { Task, ProjectType } from "@/types";
import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import StyledOption from "../atoms/StyledOption";
import SubmitButton from "../atoms/SubmitButton";

export function CollabForm(props: {
  callbackUrl?: string;
  task: Task;
  project: ProjectType;
}) {
  const [taskError, setTaskError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const task = props.task;

  const errorHandler = (error: string): void => {
    setTaskError(error);
    setTimeout(() => setTaskError(null), 10_000);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    console.log("formData: ", formData);
    const asigneeId = formData.get("asignees") || "";

    try {
      const updatedTask = await UpdateTask(
        task.id,
        task.status,
        task.priority,
        asigneeId.toString()
      );
      console.log("Task Updated", updatedTask);
      window.location.reload();
    } catch (err) {
      errorHandler("Error updating task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <StyledOption
        className={"w-full p-2 my-3 border-gray-400 border"}
        name="asignees"
        options={props.project.collaborators}
      />

      {taskError && (
        <span
          className={
            "transition-all duration-200 bg-red-500 w-full text-sm rounded-sm text-white font-medium flex items-center px-1.5 py-1"
          }
        >
          <FaExclamationCircle className="mr-2 animate-pulse" /> {taskError}
        </span>
      )}

      <SubmitButton sz={15} loading={loading}>
        {" "}
        Update{" "}
      </SubmitButton>
    </form>
  );
}
