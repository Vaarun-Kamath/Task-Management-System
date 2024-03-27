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
import { TaskCard } from "@/components/atoms/Card";
import { GetUserById } from "@/app/api/user/handler";
import { UserDetails } from "@/types/user";
import Lane from "@/components/atoms/Lane";
import STATUSES from "@/constants/TaskStatus";
function whhhhy(){}
export default function ProjectDetails({ params }: { params: { "project-details": string } }) {
  const { "project-details": projectId } = params;
  const [project, setProject] = useState<Project | null>(null);
  const [creator, setCreator] = useState<UserDetails | null>(null);
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
  const user = session?.user;

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

          try{//getting the creator of the project
            const respCreator = await GetUserById(response.content.createdBy);
            if (respCreator.errorCode) { console.log("Error getting projectCreator", respCreator) }
            else { setCreator(respCreator.content) }
          } catch (error) { console.error("Error fetching data[User]:", error) }

        }
      } catch (error) {
        console.error("Error fetching data[Project]:", error);
      }
    };

    fetchProjectData();

  }, [session, projectId, router]);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        if (projectId) {
          const response = await GetTasks(projectId);
          console.log(response, response.content)/////////////////
          setTasks(response.content);
        }
      } catch (error) {
        console.error("Error fetching data[Tasks]:", error);
      }
    };

    fetchTaskData();
  }, [session, projectId]);
  
  return (
    <>
      <PageHeader
        title={(project?.name || "Project") + (creator?" created by "+ creator.username:"")} 
        tooltip={project?.description}/>
      {loading ? null : (
        <div className=" z-50 flex flex-col px-2 mb-4 gap-5 w-full items-center">
          <AddCollaboratorSection projectId={projectId} />
          {showModal && <AddTask setShowModal={setShowModal} projectId={projectId} />}
          <div className="w-full">
            <AddButton onclick={()=>setShowModal(true)} >Add Task</ AddButton>
          </div>
          {/* <p> collaborators:{" "}
          {project?.collaborators.map((val, index) => (<p key={index}>{val}</p>))}
          </p> */}
          <div className="grid md:grid-cols-3 gap-x-1 w-full" onContextMenu={whhhhy}>
            {STATUSES.map((status,stat_index)=>(
              <Lane title={status} key={stat_index}>
              {tasks && tasks
              .filter(task => task.status === status)
              .sort((taskA, taskB) => taskA.priority - taskB.priority)
              .map((task, index) => <TaskCard data={task} key={index}/>)}
            </Lane>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
