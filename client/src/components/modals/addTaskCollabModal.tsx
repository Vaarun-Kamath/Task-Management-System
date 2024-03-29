import { Task, ProjectType } from "@/types";
import { Dispatch, SetStateAction } from "react";
import BaseModal from "./baseModal";
import { CollabForm } from "../forms/CollabForm";

export function TaskCollab({
  setShowModal,
  task,
  project,
}: {
  setShowModal: () => void;
  task: Task;
  project: ProjectType;
}) {
  return (
    <BaseModal setShowModal={setShowModal} modalTitle="Assign Collaborator">
      <CollabForm task={task} project={project} />
    </BaseModal>
  );
}
