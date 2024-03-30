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
      value = weeksLeft;
      highestUnit = "week";
    } else if (daysLeft !== 0) {
      value = daysLeft;
      highestUnit = "day";
    } else if (hoursLeft !== 0) {
      value = hoursLeft;
      highestUnit = "hour";
    } else if (minsLeft !== 0) {
      value = minsLeft;
      highestUnit = "minute";
    } else {
      value = secsLeft;
      highestUnit = "second";
    }
    highestUnit += ( value === 1 ) ? "" : "s";
  }

  return { highestUnit: highestUnit, value: value };
}

export default function Card(props: {
  deadline: string;
  name: string;
  description: string;
  href: string;
  clr?: string;
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
      className="w-full border-2 hover:bg-gray-700 hover:text-white transition-all duration-200 select-none rounded-md p-5 h-fit "
      href={props.href}
    >
      <div onContextMenu={props.onContextMenu}>
        <div className={`font-bold justify-center flex text-center `}>
          <h2 className={`ps-10 pe-10 w-fit rounded-md ${props.clr}`} >
            {props.name}
          </h2>
        </div>
        {/* <h2 className={`font-bold rounded-md text-center ${props.clr} ps-10 pe-10`} >{props.name}</h2> */}
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
