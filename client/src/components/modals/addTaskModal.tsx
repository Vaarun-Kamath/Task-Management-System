import { Dispatch, SetStateAction } from "react";
import TaskForm, { CollabForm, PriorityForm, StatusForm } from "../forms/TaskForm";
import BaseModal from "./baseModal";
import { Task } from "@/types/task";
import { Project } from "@/types/project";

const AddTask = ({ setShowModal, projectId }: { setShowModal: Dispatch<SetStateAction<boolean>>, projectId: string }) => {
  return (
    <BaseModal
      setShowModal={setShowModal}
      modalTitle="Create New Project">
        <TaskForm projectId={projectId}/>
    </BaseModal>
  );
};

export default AddTask;


export function TaskStatus({ setShowModal, task }: { setShowModal: Dispatch<SetStateAction<boolean>>, task: Task }){
  return (
  <BaseModal setShowModal={setShowModal} modalTitle="Set Status">
    <StatusForm task={task}/>
  </BaseModal>);
}
export function TaskPriority({ setShowModal, task }: { setShowModal: Dispatch<SetStateAction<boolean>>, task: Task }){
  return (
  <BaseModal setShowModal={setShowModal} modalTitle="Set Priority">
    <PriorityForm task={task}/>
  </BaseModal>);
}
export function TaskCollab({ setShowModal, task, project }: { setShowModal: Dispatch<SetStateAction<boolean>>, task: Task, project: Project }){
  return (
  <BaseModal setShowModal={setShowModal} modalTitle="Assign Collaborator">
    <CollabForm task={task} project={project}/>
  </BaseModal>);
}