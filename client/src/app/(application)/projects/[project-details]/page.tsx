"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { GetProjectById } from "@/app/api/project/handler";
import { GetTasks } from "@/app/api/task/handler";
import PageHeader from "@/components/atoms/PageHeader";
import AddCollaboratorSection from "@/components/sections/addCollaboratorSection";
import AddTask from "@/components/modals/addTaskModal";
import AddButton from "@/components/atoms/AddButton";
import { Project } from "@/types/project";
import { Task } from "@/types/task";
import Card from "@/components/atoms/Card";

export default function ProjectDetails({ params }: { params: { "project-details": string } }) {
  const { "project-details": projectId } = params;
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/`);
    },
  });

  useLayoutEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await GetProjectById(projectId);
        if (response.errorCode) {
          console.log("Error getting project", response);
          // window.location.href = "/404";
          router.push("/404");
        } else {
          setLoading(false);
          setProject(response.content);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProjectData();

  }, [session, projectId, router]);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        if (projectId) {
          const response = await GetTasks(projectId);
          setTasks(response.content);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTaskData();
  }, [session, projectId]);

  return (
    <>
      {loading ? null : (
        <div className="flex flex-col px-2 mb-4 gap-5">
          <AddCollaboratorSection projectId={projectId} />
          {showModal && <AddTask setShowModal={setShowModal} />}
          <div className="w-half">
            <AddButton onclick={()=>setShowModal(true)} >Add Task</ AddButton>
          </div>
          <p>name: {project?.name}</p>
          <p>description: {project?.description}</p>
          <p>deadline: {project?.deadline}</p>
          <p>createdBy: {project?.createdBy}</p>
          <p>createdOn: {project?.createdOn}</p>
          <p>
            collaborators:{" "}
            {project?.collaborators.map((val, index) => (
              <p key={index}>{val}</p>
            ))}
          </p>
          <p>backlog: {project?.backlog}</p>
          <p>timeline: {project?.timeline}</p>
          <p>statistics: {project?.statistics}</p>
          <div className="grid md:grid-cols-3 gap-x-3 gap-y-2 w-full">
            {tasks && tasks.map((task, index) => (
              <Card
                data={task}
                href={`/tasks/${task._id}`}
                key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
