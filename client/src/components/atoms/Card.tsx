import { Project } from "@/types/project";
import StyledLink from "./StyledLink";

export default function Card({ children }: { children: Project }) {
  const currDate = new Date();
  const deadlineDate = new Date(children.deadline as string);
  let timeLeft = (deadlineDate as any) - (currDate as any);
  let weeksLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 7));
  let daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  let minsLeft = Math.floor(timeLeft / (1000 * 60));
  let secsLeft = Math.floor(timeLeft / 1000);

  // Find the highest non-zero unit
  let highestUnit;
  let value;
  if (weeksLeft !== 0) {
    highestUnit = "weeks";
    value = weeksLeft;
  } else if (daysLeft !== 0) {
    highestUnit = "days";
    value = daysLeft;
  } else if (hoursLeft !== 0) {
    highestUnit = "hours";
    value = hoursLeft;
  } else if (minsLeft !== 0) {
    highestUnit = "minutes";
    value = minsLeft;
  } else {
    highestUnit = "seconds";
    value = secsLeft;
  }

  return (
    <StyledLink
      className="border-2 hover:bg-gray-700 hover:text-white p-5 transition-all duration-200"
      href={""}
    >
      <div className="">
        <h2 className="font-bold">{children.name}</h2>
        <p>Description: {children.description}</p>

        {/* Display the highest non-zero unit of time */}
        {value !== 0 && (
          <p>
            {value} {highestUnit} left
          </p>
        )}
      </div>
    </StyledLink>
  );
}

{
  /* <h2>{project.name}</h2>
<p>Description: {project.description}</p>
<p>Deadline: {project.deadline}</p>
<p>Created On: {project.createdOn}</p>
<p>Backlog: {project.backlog}</p>
<p>Timeline: {project.timeline}</p>
<p>Created By: {project.createdBy}</p>

<div>
    <h4>Collaborators:</h4>
    <ul>
        {project.collaborators.map((collaborator, index) => (
            <li key={index}>{collaborator}</li>
        ))}
    </ul>
</div>

<div>
    <h4>Tasks:</h4>
    <ul>
        {project.tasks.map((task, index) => (
            <li key={index}>{task}</li>
        ))}
    </ul>
</div>

<p>Statistics: {project.statistics}</p> */
}
