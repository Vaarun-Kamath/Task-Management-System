import { Task, ProjectType } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { CollabForm } from "../forms/TaskForm";
import BaseModal from "./baseModal";

export function TaskCollab({
  setShowModal,
  task,
  project,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  task: Task;
  project: ProjectType;
}) {
  return (
    <BaseModal setShowModal={setShowModal} modalTitle="Assign Collaborator">
      <CollabForm task={task} project={project} />
    </BaseModal>
  );
}
