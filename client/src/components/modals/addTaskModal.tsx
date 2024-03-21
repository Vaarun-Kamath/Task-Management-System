import { Dispatch, SetStateAction } from "react";
import { IoCloseSharp } from "react-icons/io5";
import TaskForm from "../forms/TaskForm";
import BaseModal from "./baseModal";

const AddTask = ({ setShowModal }: { setShowModal: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <BaseModal
      setShowModal={setShowModal}
      modalTitle="Create New Project">
        <TaskForm />
    </BaseModal>
  );
};

export default AddTask;
