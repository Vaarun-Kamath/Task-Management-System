import { Task } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { StatusForm } from "../forms/TaskForm";
import BaseModal from "./baseModal";

export function TaskStatus({
  setShowModal,
  task,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  task: Task;
}) {
  return (
    <BaseModal setShowModal={setShowModal} modalTitle="Set Status">
      <StatusForm task={task} />
    </BaseModal>
  );
}
