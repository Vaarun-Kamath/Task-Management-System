import { ReactNode } from "react";
import StyledLink from "./StyledLink";

export default function Lane(props: {
  // className: string,
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-col bg-gray-50 border-gray-200 border rounded-md p-5 gap-3">
      <h1 className="text-center font-semibold">{props.title}</h1>
      {props.children}
    </div>
  );
}
