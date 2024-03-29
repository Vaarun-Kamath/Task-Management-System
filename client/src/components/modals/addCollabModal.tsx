import { Dispatch, SetStateAction, useState } from "react";
import BaseModal from "./baseModal";
import AddCollabForm from "../forms/addCollabForm";
import { AddCollaborator } from "@/app/api/project/handler";
import { FaExclamation } from "react-icons/fa";

export function AddCollabModal({
  setShowModal,
  projectId,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  projectId: string;
}) {
  const [collaboratorUsername, setCollaboratorUsername] = useState<string>("");
  const [collaboratorAddError, setCollaboratorAddError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleAddCollaborator = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    ("use server");
    try {
      const res = await AddCollaborator(collaboratorUsername, projectId);
      if (res.errorCode) {
        console.log("Error adding collaborator", res);
        setCollaboratorAddError(res.errorMessage);
        setTimeout(() => {
          setCollaboratorAddError("");
        }, 3000);
      } else if (res.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log("Please try again after some time [INTERNAL SERVER ERROR]");
    } finally {
      setLoading(false);
    }
  };
  return (
    <BaseModal setShowModal={setShowModal} modalTitle="Add Collaborator">
      <AddCollabForm
        handleAddCollaborator={handleAddCollaborator}
        setCollaboratorUsername={setCollaboratorUsername}
        loading={loading}
      />
      {collaboratorAddError != "" && (
        <span className="transition-all duration-200 bg-red-500 text-sm rounded-md text-white font-medium flex items-center px-1.5 py-1 mt-2">
          <FaExclamation className="mr-2 animate-pulse" />{" "}
          {collaboratorAddError}
        </span>
      )}
    </BaseModal>
  );
}
