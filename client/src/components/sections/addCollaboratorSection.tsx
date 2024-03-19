import { AddCollaborator } from "@/app/api/project/handler";
import React, { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";

function AddCollaboratorSection() {
  const [collaboratorEmail, setCollaboratorEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCollaborator = async () => {
    setLoading(true);
    ("use server");
    try {
      const res = await AddCollaborator(collaboratorEmail);

      if (res.errorCode) {
        console.log("Error adding collaborator", res);
      } else if (res.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log("Please try again after some time");
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
          type="email"
          placeholder="Enter email"
          onChange={(e) => setCollaboratorEmail(e.target.value)}
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
    </div>
  );
}

export default AddCollaboratorSection;
