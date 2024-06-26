"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { GetProjectById } from "@/app/api/project/handler";
import { GetTasks } from "@/app/api/task/handler";
import { GetUserById } from "@/app/api/user/handler";
import Lane from "@/components/atoms/Lane";
import { ProjectType, Task, UserDetails } from "@/types";
import { StatusList } from "@/constants/TaskStatus";
import KanbanNav from "@/components/nav/KanbanNav";
import ProjectHeader from "@/components/atoms/ProjectHeader";

export default function ProjectDetails({
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
  // const user = session?.user;

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
      <ProjectHeader project={project} creator={creator} />
      {loading ? null : (
        <div className=" z-50 flex flex-col px-2 mb-4 gap-5 w-full items-center">
          <KanbanNav projectId={projectId} />
          <div className="grid md:grid-cols-3 gap-x-3 gap-y-3 w-full">
            {StatusList.map((status, stat_index) => (
              <Lane
                title={status}
                key={stat_index}
                tasks={tasks}
                project={project}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
