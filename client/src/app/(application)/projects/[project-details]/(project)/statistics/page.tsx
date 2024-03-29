"use client";

import { useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { GetProjectById } from "@/app/api/project/handler";
import PageHeader from "@/components/atoms/PageHeader";
import { GetUserById } from "@/app/api/user/handler";
import ProjTaskBreakdown from "@/components/charts/ProjTaskBreakdown";
import TasksTimeline from "@/components/charts/TasksTimeline";
import { ProjectType, UserDetails } from "@/types";
import UserContributions from "@/components/charts/UserContributions";
import KanbanNav from "@/components/nav/KanbanNav";

const ProjectStatistics = ({
  params,
}: {
  params: { "project-details": string };
}) => {
  const { "project-details": projectId } = params;
  const [project, setProject] = useState<ProjectType | null>(null);
  const [creator, setCreator] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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

          try {
            //getting the creator of the project
            const respCreator = await GetUserById(response.content.createdBy);
            if (respCreator.errorCode) {
              console.log("Error getting projectCreator", respCreator);
            } else {
              setCreator(respCreator.content);
            }
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

  return (
    <>
      <div className="mb-4 flex flex-col">
        <div className="flex flex-row place-items-end">
          <h1 className="text-3xl text-gray-900 ml-2">{project?.name || ""}</h1>
          <h4 className="text-md text-gray-500 ml-2">
            {" Created by " + creator?.username}
          </h4>
        </div>
        <hr className="border-gray-300 mt-2 w-full" />
      </div>
      <div className="flex flex-col gap-10">
        <KanbanNav projectId={projectId} />
        <div className="w-full flex flex-row">
          <div className="w-full flex flex-col items-center gap-10">
            <h1 className="text-3xl text-gray-900 ml-2 underline underline-offset-2">
              Completed Tasks Timeline
            </h1>
            <TasksTimeline projectId={projectId} className={"w-full h-96"} />
          </div>
          <div className="w-full flex flex-col items-center gap-10">
            <h1 className="text-3xl text-gray-900 ml-2 underline underline-offset-2">
              Tasks Breakdown
            </h1>
            <ProjTaskBreakdown
              projectId={projectId}
              className={"w-full h-96 flex justify-center"}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-10 flex-1 items-center w-1/2">
            <h1 className="text-3xl text-gray-900 ml-2 underline underline-offset-4">
              User Contributions
            </h1>
            <UserContributions
              projectId={projectId}
              className={"w-full h-96 flex justify-center"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectStatistics;
