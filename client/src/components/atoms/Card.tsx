import { Project } from "@/types/project";
import StyledLink from "./StyledLink";
import { Task } from "@/types/task";
import { ReactNode } from "react";


function timing(deadline: String){
  let highestUnit = "seconds";
  let value = -1;
  const currDate = new Date();
  const deadlineDate = new Date(deadline as string);
  let timeLeft = (deadlineDate as any) - (currDate as any);

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

  return { highestUnit:highestUnit, value: value };
}

export default function Card(props: {
  deadline: string, 
  name: string, 
  description: string, 
  href: string,
  children: ReactNode 
}) {
  let highestUnit: string;
  let value = -1;

  ({ highestUnit, value } = timing(props.deadline));

  if (value === undefined) {
    return <p>LOADING...</p>;
  }

  return (
    <StyledLink
      className="w-full border-2 hover:bg-gray-700 hover:text-white p-5 transition-all duration-200 select-none rounded-md"
      href={props.href}
    >
       {/* <div> */}
        <h2 className="font-bold" onMouseOver={()=>{}}>{props.name}</h2>
        <cite id="desc">Description: {props.description}</cite>

        {props.children}

        {/* Display the highest non-zero unit of time */}
        {value <= 0 ? (<p className="text-red-500 font-semibold">DEADLINE OVER</p>) : ( <p>{value} {highestUnit} left</p> )}
      {/* </div> */}
    </StyledLink>
  );
}

export function ProjectCard(props: { data: Project; href: string; tasksLeft: ReactNode}){
  const proj = props.data;
  let tasksLeft = props.tasksLeft;
  return <Card
    deadline={proj.deadline}
    name={proj.name}
    description={proj.description}
    href={props.href}>
    {tasksLeft === 0 ? (
      <p className="text-green-500 font-semibold">No More Tasks</p>
    ) : (
      <p className="text-orange-500 font-semibold">{tasksLeft} Tasks</p>
    )}
  </Card>;
}

export function TaskCard(props: { data: Task }) {
  const task = props.data;
  const clr = (task.priority===0)?"green":((task.priority==1)?"orange":"red");  
  return <Card
    deadline={task.dueDate}
    name={task.title}
    description={task.description}
    href={"#"}>
      <p className={`text-${clr}-500 font-semibold`}>{task.status}</p>
    </Card>
}
