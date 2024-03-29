import { Dispatch, SetStateAction } from "react";
import TaskForm from "../forms/TaskForm";
import BaseModal from "./baseModal";

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
