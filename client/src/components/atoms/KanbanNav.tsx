import React, { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { MdAddChart } from "react-icons/md";
import { AddCollabModal } from "../modals/addCollabModal";
import AddTask from "../modals/addTaskModal";

function KanbanNav(props: { projectId: string }) {
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [showAddCollabModal, setShowAddCollabModal] = useState(false);
  return (
    <>
      {addTaskModal && (
        <AddTask setShowModal={setAddTaskModal} projectId={props.projectId} />
      )}
      {showAddCollabModal && (
        <AddCollabModal
          projectId={props.projectId}
          setShowModal={setShowAddCollabModal}
        />
      )}
      <div className="w-full flex flex-row gap-3">
        <button
          className={
            "flex border-2 items-center gap-2 px-4 py-1 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200 "
          }
          onClick={() => setAddTaskModal(true)}
        >
          <span>
            <MdAddChart />
          </span>
          Add Task
        </button>
        <button
          className={
            "flex border-2 items-center gap-2 px-4 py-1 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200 "
          }
          onClick={() => setShowAddCollabModal(true)}
        >
          <span>
            <IoMdPersonAdd />
          </span>
          Add Collaborator
        </button>
      </div>
    </>
  );
}

export default KanbanNav;
