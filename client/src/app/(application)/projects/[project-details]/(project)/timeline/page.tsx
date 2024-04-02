"use client";

import { GetProjectById } from "@/app/api/project/handler";
import { GetTasks } from "@/app/api/task/handler";
import { GetUserById } from "@/app/api/user/handler";
import DynamicSwatch from "@/components/atoms/DynamicSwatch";
import ProjectHeader from "@/components/atoms/ProjectHeader";
import ProjectNav from "@/components/nav/ProjectNav";
import { months } from "@/constants/Months";
import { StatusList } from "@/constants/TaskStatus";
import { ProjectType, UserDetails, Task } from "@/types";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";

function getColour(priority: number) {
  return priority < 10 ? "green" : priority < 20 ? "orange" : "red";
}
function getColourStatus(status: string) {
  if (status == StatusList[StatusList.length - 1]) {
    return "green";
  } else return "gray";
}

function time(tim: string) {
  return new Date(tim).getTime();
}

function splitTasks(tasks: Task[]) {
  const sortedTasks = tasks.sort(
    (taskA, taskB) => time(taskA.createdOn) - time(taskB.createdOn)
  );
  const result: Task[][] = [];

  for (const task of sortedTasks) {
    let added = false;
    for (const row of result) {
      const lastTask = row[row.length - 1];
      if (
        lastTask &&
        time(task.createdOn) >= time(lastTask.dueDate) + 355_000_000
      ) {
        row.push(task);
        added = true;
        break;
      }
    }

    if (!added) {
      result.push([task]);
    }
  }

  return result;
}

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

  console.log("REEE");

  return (
    <div
      className=" overflow-y-hidden h-screen"
      style={{ scrollbarWidth: "none" }}
    >
      <ProjectHeader project={project} creator={creator} />
      <ProjectNav projectId={projectId} remove="timeline" />

      <div
        className="gap-1 w-full h-full relative rounded-lg mt-3 bg-slate-200 p-1"
        id="AAA"
      >
        <div className="flex flex-row opacity-50">
          {months.map((month) => (
            <div
              className="w-1/12 text-center border-l-2 border-r-2 border-b-2 border-gray-600 pb-2 m-0"
              key={month}
            >
              {month}
            </div>
          ))}
        </div>
        <br />
        <div
          style={{
            left: (new Date().getTime() - 1704067200000) / 316224000 + "%",
          }}
          className="w-0.5 h-full absolute top-0 z--10 min-w-0.25 border-dashed border-red-600 border-l-2"
        />
        <TimelineTasks tasks={tasks} />
      </div>
      <DynamicSwatch />
    </div>
  );
}

function TimelineTasks({ tasks }: { tasks: Task[] }) {
  var tskGrps = splitTasks(tasks);
  return (
    <>
      <div className="w-full h-full relative">
        {tskGrps.map((taskes, index) =>
          taskes.map((task) => (
            <div
              title={task.description}
              key={task.id}
              style={{
                left: (time(task.createdOn) - 1704067200000) / 316224000 + "%",
                top: index * 38 + "px",
                minWidth:
                  (time(task.dueDate) - time(task.createdOn)) / 316224000 + "%",
              }}
              className={`
              font-bold border-2 rounded-md scroll-m-0 scroll-p-0
              absolute translate-x--1/2 justify-center text-center
              bg-gray-700 text-gray-700 border-${getColourStatus(
                task.status
              )}-500 
              hover:bg-gray-700 hover:text-${getColour(
                task.priority
              )}-500 hover:rounded-md hover:w-fit hover:z-50
              p-1 ps-2 pe-2 w-1 h-9 overflow-clip`}
            >
              {task.title}
            </div>
          ))
        )}
      </div>
    </>
  );
}
