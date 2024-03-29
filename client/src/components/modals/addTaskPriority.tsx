import { Task } from "@/types";
import { Dispatch, SetStateAction } from "react";
import BaseModal from "./baseModal";
import { PriorityForm } from "../forms/PriorityForm";

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
