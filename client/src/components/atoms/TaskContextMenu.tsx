import React from "react";
import { GrStatusDisabled } from "react-icons/gr";
import { MdLowPriority, MdGroups } from "react-icons/md";
import ContextMenu from "./ContextMenu";
import { Task } from "@/types";

function TaskContextMenu(props: {
  contextMenuPosition: { x: number; y: number };
  setContextMenuPosition: (position: { x: number; y: number } | null) => void;
  setShowStatusModal: (task: Task) => void;
  setShowPriorityModal: (task: Task) => void;
  setShowCollabModal: (task: Task) => void;
  task: Task;
}) {
  return (
    <ContextMenu
      position={props.contextMenuPosition}
      setContextMenuPosition={props.setContextMenuPosition}
    >
      <button
        className={
          "flex border-2 items-center gap-2 px-4 py-1 rounded-sm hover:bg-gray-700 hover:text-white transition-all duration-200 w-full"
        }
        onClick={() => {
          props.setContextMenuPosition(null);
          props.setShowStatusModal(props.task);
        }}
      >
        <span>
          <GrStatusDisabled />
        </span>
        Set Status
      </button>
      <button
        className={
          "flex border-2 items-center gap-2 px-4 py-1 rounded-sm hover:bg-gray-700 hover:text-white transition-all duration-200 w-full"
        }
        onClick={() => {
          props.setContextMenuPosition(null);
          props.setShowPriorityModal(props.task);
        }}
      >
        <span>
          <MdLowPriority />
        </span>
        Set Priority
      </button>
      <button
        className={
          "flex border-2 items-center gap-2 px-4 py-1 rounded-sm hover:bg-gray-700 hover:text-white transition-all duration-200 w-full"
        }
        onClick={() => {
          props.setContextMenuPosition(null);
          props.setShowCollabModal(props.task);
        }}
      >
        <span>
          <MdGroups />
        </span>
        Assign Collaborator
      </button>
    </ContextMenu>
  );
}

export default TaskContextMenu;
