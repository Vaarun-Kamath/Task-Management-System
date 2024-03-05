"use client";

import React from "react";
import { allowedRoutes } from "@/constants/AllowedRoutes";
import StyledLink from "./atoms/StyledLink";

export default function Sidebar() {
  return (
    <>
      <aside
        id="sidebar"
        className="fixed lg:relative top-0 left-0 z-40 w-[15rem] lg:w-[17.5rem] h-screen transition-transform translate-x-0 border-r-4 lg:translate-x-0 border-gray-700 flex flex-col gap-3"
        style={{ paddingTop: "70px" }}
      >
        {allowedRoutes.map((links, index) => (
          <StyledLink
            href={links.link}
            key={index}
            className="flex flex-row gap-5 border-t border-b border-gray-500 p-5"
          >
            {links.name}
          </StyledLink>
        ))}
      </aside>
    </>
  );
}
