import { ReactNode } from "react";
import StyledLink from "./StyledLink";

export default function Lane(props: {
    // className: string,
    title: string,
    children: ReactNode 
  }) {  
    return (
      <div className="w-full h-screen flex flex-col border-2 p-2">
        <h1>{props.title}</h1>
      {props.children}
      </div>
    );
  }