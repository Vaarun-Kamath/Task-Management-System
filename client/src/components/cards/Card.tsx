import StyledLink from "../atoms/StyledLink";
import { ReactNode } from "react";

function timing(deadline: string) {
  let highestUnit = "seconds";
  let value = -1;
  const currDate = new Date();
  const deadlineDate = new Date(deadline as string);
  let timeLeft = (deadlineDate as any) - (currDate as any);

  if (timeLeft > 0) {
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

  return { highestUnit: highestUnit, value: value };
}

export default function Card(props: {
  deadline: string;
  name: string;
  description: string;
  href: string;
  children: ReactNode;
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  let highestUnit: string;
  let value = -1;

  ({ highestUnit, value } = timing(props.deadline));

  if (value === undefined) {
    return <p>LOADING...</p>;
  }

  return (
    <StyledLink
      className="w-full border-2 hover:bg-gray-700 hover:text-white transition-all duration-200 select-none rounded-md p-5 h-fit"
      href={props.href}
    >
      <div onContextMenu={props.onContextMenu}>
        <h2 className="font-bold">{props.name}</h2>
        <cite id="desc">{props.description}</cite>

        {props.children}

        {/* Display the highest non-zero unit of time */}
        {value <= 0 ? (
          <p className="text-red-500 font-semibold"> Deadline Over </p>
        ) : (
          <p>
            {" "}
            {value} {highestUnit} left{" "}
          </p>
        )}
      </div>
    </StyledLink>
  );
}
