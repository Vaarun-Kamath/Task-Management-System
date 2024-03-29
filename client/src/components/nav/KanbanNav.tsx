import React, { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { MdAddChart } from "react-icons/md";
import { AddCollabModal } from "../modals/addCollabModal";
import AddTask from "../modals/addTaskModal";
import AddButton from "../atoms/AddButton";
import ProjectNav from "./ProjectNav";

function KanbanNav(props: { projectId: string }) {
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [showAddCollabModal, setShowAddCollabModal] = useState(false);
  // const [showAddLaneModal, setShowAddLaneModal] = useState(false);//TODO MAYBE ADD LANES
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

      <ProjectNav projectId={props.projectId} remove="kanban">
        <div className="flex flex-row gap-3">
          <AddButton
            onclick={() => setAddTaskModal(true)}
            icon={<MdAddChart />}
            text="Add Task"
          />
          <AddButton
            onclick={() => setShowAddCollabModal(true)}
            icon={<IoMdPersonAdd />}
            text="Add Collaborator"
          />
        </div>
      </ProjectNav>
    </>
  );
}

export default KanbanNav;
