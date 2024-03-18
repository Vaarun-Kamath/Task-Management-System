"use client";

import { useEffect, useState } from "react";
import { Project } from "@/types/project";
import Card from "@/components/atoms/Card";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { GetProjects } from "@/app/api/project/handler";
import AddProject from "@/components/modals/addProjectModal";
import { MdAddChart } from "react-icons/md";

function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

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
        const user_id = user?.user_id;
        const response = await GetProjects(user_id);
        console.log(response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session, user?.user_id]);

  return (
    <div className="flex flex-col px-2 mb-4 gap-5 items-center">
      <div className="w-full">
        <button
          className="flex border-2 items-center gap-2 px-4 py-1 rounded-sm hover:bg-gray-700 hover:text-white transition-all duration-200"
          onClick={() => setShowModal(true)}
        >
          <span>
            <MdAddChart />
          </span>{" "}
          Add Project
        </button>
      </div>
      {showModal && <AddProject setShowModal={setShowModal} />}
      <div className="grid grid-cols-3 gap-x-3 gap-y-2 w-full">
        {projects &&
          projects.map((project, index) => <Card key={index}>{project}</Card>)}
      </div>
    </div>
  );
}

export default Projects;
