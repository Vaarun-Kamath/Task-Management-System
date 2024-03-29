import { GetTasks } from "@/app/api/task/handler";
import { useState, useEffect } from "react";
import { ProjectType } from "@/types";
import { ProjectCard } from "./ProjectCard";

interface ProjectCardWithTasksProps {
  project: ProjectType;
}

export function ProjectCardWithTasks({ project }: ProjectCardWithTasksProps) {
  const [tasksLeft, setTasksLeft] = useState<number>(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await GetTasks(project._id);
        const tasks = response.content;
        setTasksLeft(tasks.length);
      } catch (error) {
        console.error(
          `Error fetching tasks for project ${project._id}:`,
          error
        );
      }
    };

    fetchTasks();
  }, [project._id]);

  return (
    <ProjectCard
      data={project}
      href={`/projects/${project._id}/kanban`}
      tasksLeft={tasksLeft}
    />
  );
}
