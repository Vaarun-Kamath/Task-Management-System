import { Dispatch, SetStateAction } from "react";
import TaskForm, {
  CollabForm,
  PriorityForm,
  StatusForm,
} from "../forms/TaskForm";
import BaseModal from "./baseModal";
import { Task, ProjectType } from "@/types";

const AddTask = ({
  setShowModal,
  projectId,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  projectId: string;
}) => {
  return (
    <BaseModal setShowModal={setShowModal} modalTitle="Create New Project">
      <TaskForm projectId={projectId} />
    </BaseModal>
  );
};


export default AddTask;


