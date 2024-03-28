import { Task } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { PriorityForm } from "../forms/TaskForm";
import BaseModal from "./baseModal";

export function TaskPriority({
  setShowModal,
  task,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  task: Task;
}) {
  return (
    <BaseModal setShowModal={setShowModal} modalTitle="Set Priority">
      <PriorityForm task={task} />
    </BaseModal>
  );
}
