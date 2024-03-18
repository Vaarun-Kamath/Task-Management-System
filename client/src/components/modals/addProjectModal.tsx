import { Dispatch, SetStateAction } from "react";
import { IoCloseSharp } from "react-icons/io5";
import ProjectForm from "../forms/ProjectForm";

const AddProject = ({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="transition-all duration-200 fixed top-1/2 left-3/4 transform -translate-x-3/4 -translate-y-1/2 bg-white rounded-md shadow-2xl w-9/12 overflow-hidden z-50">
      <div className="px-4 py-3 bg-slate-800 rounded-t-md flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Create New Project
          </h2>
        </div>
        <button
          onClick={() => setShowModal(false)}
          className="cursor-pointer border-2 hover:text-red-500 hover:bg-gray-200 transition-all duration-200 p-1 flex items-center rounded-lg text-xs text-white"
        >
          <IoCloseSharp className="h-5 w-5 " />
        </button>
      </div>
      <div className="overflow-y-auto max-h-[33rem]">
        <div className="p-10">
          <ProjectForm />
        </div>
      </div>
    </div>
  );
};

export default AddProject;
