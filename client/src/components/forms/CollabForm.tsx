import { UpdateTask } from "@/app/api/task/handler";
import { Task, ProjectType, UserDetails } from "@/types";
import React, { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import StyledOption from "../atoms/StyledOption";
import SubmitButton from "../atoms/SubmitButton";
import { GetUserById } from "@/app/api/user/handler";

export function CollabForm(props: {
  callbackUrl?: string;
  task: Task;
  project: ProjectType;
}) {
  const collabIds: string[] = props.project.collaborators;
  const [taskError, setTaskError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [collaborators, setCollaborators] = useState<UserDetails[]>([]);
  const task = props.task;

  useEffect(() => {
    const fetchCollabData = async () => {
      try {
        const collabObjectResponses = await Promise.all(
          collabIds.map((id) => GetUserById(id))
        );
        const collabObjects = collabObjectResponses.map(
          (response) => response.content
        );
        setCollaborators(collabObjects);
      } catch (error) {
        console.error("Error fetching data[Collaborators]:", error);
      }
    };

    fetchCollabData();
  }, [collabIds]);

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
        options={collaborators.map((collab) => collab.username)}
        values={collabIds}
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
