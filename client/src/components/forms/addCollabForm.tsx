import React from "react";
import { IoPersonAddSharp } from "react-icons/io5";

function AddCollabForm(props: {
  handleAddCollaborator: (event: React.FormEvent<HTMLFormElement>) => void;
  setCollaboratorUsername: (value: string) => void;
  loading: boolean;
}) {
  return (
    <form
      className="flex flex-row gap-3"
      onSubmit={props.handleAddCollaborator}
    >
      <input
        className="p-2 focus:ring-0 w-full border-2 rounded-md transition-all duration-200 focus:border-gray-700"
        type="text"
        placeholder="Enter username"
        onChange={(e) => props.setCollaboratorUsername(e.target.value)}
        disabled={props.loading}
      />
      <button
        type="submit"
        disabled={props.loading}
        className={
          "border-2 px-5 py-1 flex-1 flex flex-row rounded-md justify-center items-center gap-3 hover:bg-gray-700 hover:text-white transition-all duration-200 " +
          (props.loading ? "cursor-not-allowed bg-gray-500 select-none" : "")
        }
      >
        <span>
          <IoPersonAddSharp />
        </span>
        Add
      </button>
    </form>
  );
}

export default AddCollabForm;
