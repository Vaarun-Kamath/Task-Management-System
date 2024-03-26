"use client";

import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { AddTask } from "@/app/api/task/handler";
import StyledInput from "../atoms/StyledInput";
import StyledOption from "../atoms/StyledOption";
import SubmitButton from "../atoms/SubmitButton";
import STATUSES from "@/constants/TaskStatus";

type Props = { callbackUrl?: string; projectId: string};

export default function TaskForm(props: Props) {
  const [taskError, setTaskError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedValue] = useState('TODO');
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

  const validateInputs = ( title: FormDataEntryValue, dueDate: FormDataEntryValue ): boolean => {
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

  const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ): Promise<void> => {
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

  const inputClsName:string = "w-full p-2 my-3 border-gray-400 border";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <StyledInput className={inputClsName}
        name="title" type="text"
        placeholder="Task title"
        required={true}
      />
      <StyledInput className={inputClsName}
        name="description"
        type="text"
        placeholder="Task Description"
        required={true}
      />
      <StyledInput className={inputClsName}
        name="dueDate"
        type="date"
        required={true}
      />
      <StyledInput className={inputClsName}
        name="priority"
        type="number"
        pattern="[0-9]+"
      />
      <StyledOption className={inputClsName}
        name="status"
        options={STATUSES}
        onChange={e=>setSelectedValue(e.target.value)}
      />

      {taskError && (
        <span className="transition-all duration-200 bg-red-500 w-full text-sm rounded-sm text-white font-medium flex items-center px-1.5 py-1">
          <FaExclamationCircle className="mr-2 animate-pulse" /> {taskError}
        </span>
      )}

      <SubmitButton sz={15} loading={loading}> Create </SubmitButton>
    </form>
  );
}
