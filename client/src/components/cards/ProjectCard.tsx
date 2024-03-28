import React, { ReactNode } from "react";
import Card from "./Card";
import { ProjectType } from "@/types";

export function ProjectCard(props: {
  data: ProjectType;
  href: string;
  tasksLeft: ReactNode;
}) {
  const proj = props.data;
  let tasksLeft = props.tasksLeft;
  return (
    <Card
      deadline={proj.deadline}
      name={proj.name}
      description={proj.description}
      href={props.href}
    >
      {tasksLeft === 0 ? (
        <p className="text-green-500 font-semibold">No More Tasks</p>
      ) : (
        <p className="text-orange-500 font-semibold">{tasksLeft} Tasks</p>
      )}
    </Card>
  );
}
