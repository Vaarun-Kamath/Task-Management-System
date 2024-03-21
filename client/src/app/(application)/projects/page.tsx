"use client";

import { useEffect, useState } from "react";
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/atoms/Card";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { GetProjects } from "@/app/api/project/handler";
import AddProject from "@/components/modals/addProjectModal";
import AddButton from "@/components/atoms/AddButton";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/`);
    },
  });
  const user = session?.user;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.user_id) {
          const user_id = user.user_id;
          const response = await GetProjects(user_id);
          setProjects(response.content);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session, user?.user_id]);

  return (
    <div className="flex flex-col px-2 mb-4 gap-5 items-center">
      <div className="w-full">
        <AddButton onclick={() => setShowModal(true)} >Add Project</AddButton>
      </div>
      {showModal && <AddProject setShowModal={setShowModal} />}
      <div className="grid md:grid-cols-3 gap-x-3 gap-y-2 w-full">
        {projects &&
          projects.map((project, index) => (
            <ProjectCard data={project} href={`/projects/${project._id}`} key={index}/>
          ))}
      </div>
    </div>
  );
}

export default Projects;
