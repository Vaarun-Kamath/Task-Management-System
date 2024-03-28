"use client";

import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { AddTask, UpdateTask } from "@/app/api/task/handler";
import STATUSES from "@/constants/TaskStatus";
import StyledInput from "../atoms/StyledInput";
import StyledOption from "../atoms/StyledOption";
import SubmitButton from "../atoms/SubmitButton";
import { Task } from "@/types";
import { ProjectType } from "@/types";

const inputClsName: string = "w-full p-2 my-3 border-gray-400 border";
const errClsName: string =
  "transition-all duration-200 bg-red-500 w-full text-sm rounded-sm text-white font-medium flex items-center px-1.5 py-1";
type TaskFormProps = { callbackUrl?: string; projectId: string };

export default function TaskForm(props: TaskFormProps) {
  const [taskError, setTaskError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/`);
    },
  });

  const errorHandler = (error: string): void => {
    setTaskError(error);
    setTimeout(() => setTaskError(null), 10_000);
  };

  const validateInputs = (
    title: FormDataEntryValue,
    dueDate: FormDataEntryValue
  ): boolean => {
    if (title === "") {
      setLoading(false);
      errorHandler("Task title is required");
      return false;
    }

    if (dueDate != null) {
      const currDate = new Date();
      const deadlineDate = new Date(dueDate.toString());
      if (deadlineDate < currDate) {
        setLoading(false);
        errorHandler("The date has already passed");
        return false;
      }
    }
    setTaskError(null);
    return true;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") || "";
    const description = formData.get("description") || "";
    const dueDate = formData.get("dueDate") || "";
    const status = formData.get("status") || "TODO";
    const priority = formData.get("priority") || "0";

    try {
      if (!validateInputs(title, dueDate)) return;
      const addedTask = await AddTask(
        title.toString(),
        description.toString(),
        dueDate.toString(),
        session?.user.user_id,
        props.projectId.toString(),
        status.toString(),
        parseInt(priority.toString())
      );
      console.log("New Task Created", addedTask);
      window.location.reload();
    } catch (err) {
      errorHandler("Error creating task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <StyledInput
        className={inputClsName}
        name="title"
        type="text"
        placeholder="Task title"
        required={true}
      />
      <StyledInput
        className={inputClsName}
        name="description"
        type="text"
        placeholder="Task Description"
        required={true}
      />
      <StyledInput
        className={inputClsName}
        name="dueDate"
        type="date"
        required={true}
      />
      <StyledInput
        className={inputClsName}
        name="priority"
        type="number"
        pattern="[0-9]+"
      />
      <StyledOption
        className={inputClsName}
        name="status"
        options={STATUSES}
        // onChange={e=>setSelectedValue(e.target.value)}
      />

      {taskError && (
        <span className={errClsName}>
          <FaExclamationCircle className="mr-2 animate-pulse" /> {taskError}
        </span>
      )}

      <SubmitButton sz={15} loading={loading}>
        {" "}
        Create{" "}
      </SubmitButton>
    </form>
  );
}

export function StatusForm(props: { callbackUrl?: string; task: Task }) {
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
    const status = formData.get("status") || "TODO";

    try {
      const updatedTask = await UpdateTask(
        task.id,
        status.toString(),
        task.priority,
        task.assigneeId?.toString() || ""
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
      <StyledOption className={inputClsName} name="status" options={STATUSES} />

      {taskError && (
        <span className={errClsName}>
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

export function PriorityForm(props: { callbackUrl?: string; task: Task }) {
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
    const priority = formData.get("priority") || "0";

    try {
      const updatedTask = await UpdateTask(
        task.id,
        task.status,
        parseInt(priority.toString()),
        task.assigneeId?.toString() || ""
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
      <StyledInput
        className={inputClsName}
        name="priority"
        type="number"
        pattern="[0-9]+"
      />

      {taskError && (
        <span className={errClsName}>
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
        className={inputClsName}
        name="asignees"
        options={props.project.collaborators}
      />

      {taskError && (
        <span className={errClsName}>
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
