import { Dispatch, SetStateAction } from "react";
import ProjectForm from "../forms/ProjectForm";
import BaseModal from "./baseModal";

const AddProject = ({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <BaseModal setShowModal={setShowModal} modalTitle="Create New Project">
      <ProjectForm />
    </BaseModal>
  );
};

export default AddProject;
