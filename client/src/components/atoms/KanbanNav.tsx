import React, { useState } from "react";
import { IoIosTimer, IoMdPersonAdd } from "react-icons/io";
import { MdAddChart } from "react-icons/md";
import { AddCollabModal } from "../modals/addCollabModal";
import AddTask from "../modals/addTaskModal";
import AddButton from "./AddButton";
import { IoStatsChart } from "react-icons/io5";
import StyledLink from "./StyledLink";
import { GoTasklist } from "react-icons/go";

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
      <div className="w-full flex flex-row gap-3 justify-between">
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

        <div className="flex flex-row gap-3">
          <StyledLink
            href={"/projects/" + props.projectId + "/kanban"}
            className={
              "flex border-2 items-center gap-2 px-4 py-1 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200 "
            }
          >
            <span>
              <GoTasklist />
            </span>
            View Tasks
          </StyledLink>

          <StyledLink
            href={"/projects/" + props.projectId + "/statistics"}
            className={
              "flex border-2 items-center gap-2 px-4 py-1 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200 "
            }
          >
            <span>
              <IoStatsChart />
            </span>
            Project Statistics
          </StyledLink>

          <StyledLink
            href={"/projects/" + props.projectId + "/timeline"}
            className={
              "flex border-2 items-center gap-2 px-4 py-1 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200 "
            }
          >
            <span>
              <IoIosTimer />
            </span>
            Project Timeline
          </StyledLink>
        </div>

      
      </div>
    </>
  );
}

export default KanbanNav;
