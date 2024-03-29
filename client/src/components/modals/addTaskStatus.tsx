import { Task } from "@/types";
import { Dispatch, SetStateAction } from "react";
import BaseModal from "./baseModal";
import { StatusForm } from "../forms/StatusForm";

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
