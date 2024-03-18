import { Project } from "@/types/project";
import StyledLink from "./StyledLink";

export default function Card(props: { data: Project; href: string }) {
  const currDate = new Date();
  const deadlineDate = new Date(props.data.deadline as string);
  let timeLeft = (deadlineDate as any) - (currDate as any);

  let highestUnit;
  let value = -1;

  let tasksLeft = props.data.tasks.length; // Change once Task Class is added

  if (timeLeft>0) {
    let weeksLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 7));
    let daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    let minsLeft = Math.floor(timeLeft / (1000 * 60));
    let secsLeft = Math.floor(timeLeft / 1000);

    // Find the highest non-zero unit
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
  }

  if (value === undefined) {
    return <p>LOADING...</p>;
  }

  return (
    <StyledLink
      className="border-2 hover:bg-gray-700 hover:text-white p-5 transition-all duration-200 select-none"
      href={props.href}
    >
      <div className="">
        <h2 className="font-bold">{props.data.name}</h2>
        <p>Description: {props.data.description}</p>
        {tasksLeft === 0 ? (
          <p className="text-green-500 font-semibold">No More Tasks</p>
        ) : (
          <p className="text-orange-500 font-semibold">{tasksLeft} Tasks</p>
        )}

        {/* Display the highest non-zero unit of time */}
        {value <= 0 ? (
          <p className="text-red-500 font-semibold">DEADLINE OVER</p>
        ) : (
          <p>{value} {highestUnit} left</p>
        )}
      </div>
    </StyledLink>
  );
}
