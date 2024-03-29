"use client"

import { GetProjectById } from "@/app/api/project/handler";
import { GetTasks } from "@/app/api/task/handler";
import { GetUserById } from "@/app/api/user/handler";
import ProjectHeader from "@/components/atoms/ProjectHeader";
import ProjectNav from "@/components/nav/ProjectNav";
import { ProjectType, UserDetails, Task } from "@/types";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";

export default function TimelinePage({
  params,
}: {
  params: { "project-details": string };
}) {
  const { "project-details": projectId } = params;
  const [project, setProject] = useState<ProjectType | null>(null);
  const [creator, setCreator] = useState<UserDetails | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
          router.push("/404");
        } else {
          setLoading(false);
          setProject(response.content);

          try {
            const respCreator = await GetUserById(response.content.createdBy);
            if (respCreator.errorCode)
              console.log("Error getting projectCreator", respCreator);
            else setCreator(respCreator.content);
          } catch (error) {
            console.error("Error fetching data[User]:", error);
          }
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
          console.log(response, response.content);
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
      <ProjectHeader project={project} creator={creator}/>
      <ProjectNav projectId={projectId} remove="timeline"/>
      <h1>Timeline</h1>
      <div className="timeline">
        {tasks.map(task => (
          <div key={task.id}>{task.title}</div>
        ))}
      </div>
      <div >
        <div className={`font-bold justify-center flex text-center `}>
      </div>
      </div>
    </>
  );
}
