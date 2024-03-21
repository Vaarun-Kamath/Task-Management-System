import { AddCollaborator } from "@/app/api/project/handler";
import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";

function AddCollaboratorSection(props: { projectId: string }) {
  const [collaboratorUsername, setCollaboratorUsername] = useState<string>("");
  const [collaboratorAddError, setCollaboratorAddError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleAddCollaborator = async () => {
    setLoading(true);
    ("use server");
    try {
      const res = await AddCollaborator(collaboratorUsername, props.projectId);

      console.log("AddCollaborator: ", res);

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
    <div className="flex flex-col flex-1 border p-5 gap-5">
      <div>
        <h2 className="font-semibold">Add Collaborator</h2>
      </div>
      <div className="flex gap-3">
        <input
          className="p-2 w-1/5 focus:ring-0 border-2 rounded-md transition-all duration-200 focus:border-gray-700"
          type="text"
          placeholder="Enter username"
          onChange={(e) => setCollaboratorUsername(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={handleAddCollaborator}
          disabled={loading}
          className={
            "border-2 px-5 py-1 flex flex-row rounded-md justify-center items-center gap-3 hover:bg-gray-700 hover:text-white transition-all duration-200 " +
            (loading ? "cursor-not-allowed bg-gray-500 select-none" : "")
          }
        >
          <span>
            <IoPersonAddSharp />
          </span>
          Add
        </button>
      </div>
      {collaboratorAddError != "" && (
        <span className="transition-all duration-200 bg-red-500 w-full text-sm rounded-sm text-white font-medium flex items-center px-1.5 py-1">
          <FaExclamationCircle className="mr-2 animate-pulse" />{" "}
          {collaboratorAddError}
        </span>
      )}
    </div>
  );
}

export default AddCollaboratorSection;
