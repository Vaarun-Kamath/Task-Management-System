import { Dispatch, SetStateAction } from "react";
import { IoCloseSharp } from "react-icons/io5";
import ProjectForm from "../forms/ProjectForm";

const AddProject = ({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="transition-all duration-200 lg:-translate-x-1/2 fixed transform bg-white rounded-md shadow-2xl lg:w-1/3 md:w-2/3 w-full overflow-hidden z-50">
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
