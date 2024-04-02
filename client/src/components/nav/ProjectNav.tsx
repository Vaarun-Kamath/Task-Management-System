import { ReactNode } from "react";
import StyledLink from "../atoms/StyledLink";
import { GoTasklist } from "react-icons/go";
import { IoIosTimer } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";

export default function ProjectNav({
  children,
  projectId,
  remove,
}: {
  children?: ReactNode;
  projectId: string;
  remove?: string;
}) {
  var baseHref = "/projects/" + projectId;
  var displayKanban = true;
  var displayStats = true;
  var displayTimeline = true;

  switch (remove) {
    case "kanban":
      displayKanban = false;
      break;
    case "statistics":
      displayStats = false;
      break;
    case "timeline":
      displayTimeline = false;
      break;
    default:
      break;
  }

  return (
    <div className="w-full flex flex-row gap-3 justify-between">
      {children}
      <div className="flex flex-row gap-3">
        {displayKanban && (
          <StyledLink
            href={baseHref + "/kanban"}
            className={
              "flex border-2 items-center gap-2 px-4 py-1 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200 "
            }
          >
            <span>
              <GoTasklist />
            </span>
            View Tasks
          </StyledLink>
        )}

        {displayStats && (
          <StyledLink
            href={baseHref + "/statistics"}
            className={
              "flex border-2 items-center gap-2 px-4 py-1 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200 "
            }
          >
            <span>
              <IoStatsChart />
            </span>
            Project Statistics
          </StyledLink>
        )}

        {displayTimeline && (
          <StyledLink
            href={baseHref + "/timeline"}
            className={
              "flex border-2 items-center gap-2 px-4 py-1 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200 "
            }
          >
            <span>
              <IoIosTimer />
            </span>
            Project Timeline
          </StyledLink>
        )}
      </div>
    </div>
  );
}
