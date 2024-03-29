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

const ProjectInsights = ({
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
      <PageHeader
        title={
          (project?.name || "Project") +
          (creator ? " created by " + creator.username : "")
        }
      />
      <h1>Tasks Breakdown</h1>
      <ProjTaskBreakdown projectId={projectId} />
      <h1>Completed Tasks Timeline</h1>
      <TasksTimeline projectId={projectId} />
      <h1>User Contributions</h1>
      <UserContributions projectId={projectId} />
    </>
  );
};

export default ProjectInsights;
