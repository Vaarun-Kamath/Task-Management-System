import { ProjectType, UserDetails } from "@/types";
import React from "react";

function ProjectHeader({
    project,
    creator
}:{
    project: ProjectType | null;
    creator?: UserDetails | null;
}) {
  return (
    <div className="mb-4 flex flex-col">
        <div className="flex flex-row place-items-end">
          <h1 className="text-3xl text-gray-900 ml-2">{project?.name || ""}</h1>
          <h4 className="text-md text-gray-500 ml-2">
            {creator ? " Created by " + creator.username : ""}
          </h4>
        </div>
        <hr className="border-gray-300 mt-2 w-full" />
      </div>
  );
}

export default ProjectHeader;
