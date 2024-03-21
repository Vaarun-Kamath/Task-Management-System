"use client";

import { useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { GetProjectById } from "@/app/api/project/handler";
import PageHeader from "@/components/atoms/PageHeader";
import AddCollaboratorSection from "@/components/sections/addCollaboratorSection";
import AddTask from "@/components/modals/addTaskModal";
import AddButton from "@/components/atoms/AddButton";
import { Project } from "@/types/project";

export default function ProjectDetails({
  params,
}: {
  params: { "project-details": string };
}) {
  const { "project-details": projectId } = params;
  const [project, setProject] = useState<Project | null>(null);
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
    const fetchData = async () => {
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

    fetchData();
  }, [session, projectId, router]);

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
          <p>tasks: {project?.tasks}</p>
          <p>backlog: {project?.backlog}</p>
          <p>timeline: {project?.timeline}</p>
          <p>statistics: {project?.statistics}</p>
        </div>
      )}
    </>
  );
}
