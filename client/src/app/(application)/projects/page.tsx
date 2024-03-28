"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { GetProjects } from "@/app/api/project/handler";
import AddProject from "@/components/modals/addProjectModal";
import PageHeader from "@/components/atoms/PageHeader";
import { MdAddChart } from "react-icons/md";
import { ProjectType } from "@/types";
import { ProjectCardWithTasks } from "@/components/cards/ProjectTaskCard";

function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
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
    <>
      <PageHeader title="Projects" />
      <div className="flex flex-col px-2 mb-4 gap-5 items-center">
        <div className="w-full">
          <button
            className={
              "flex border-2 items-center gap-2 px-4 py-1 rounded-sm hover:bg-gray-700 hover:text-white transition-all duration-200 "
            }
            onClick={() => setShowModal(true)}
          >
            <span>
              <MdAddChart />
            </span>
            Add Project
          </button>
        </div>
        {showModal && <AddProject setShowModal={setShowModal} />}
        <div className="grid md:grid-cols-3 gap-x-3 gap-y-2 w-full">
          {projects &&
            projects.map((project, index) => (
              <ProjectCardWithTasks project={project} key={index} />
            ))}
        </div>
      </div>
    </>
  );
}

export default Projects;
