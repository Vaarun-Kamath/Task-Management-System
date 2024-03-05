"use client";

import React from "react";
import { allowedRoutes } from "@/constants/AllowedRoutes";
import StyledLink from "./atoms/StyledLink";

export default function Sidebar() {
  return (
    <>
      <aside
        id="sidebar"
        className="fixed lg:relative bg-blue-950 top-0 left-0 z-40 w-[15rem] lg:w-[17.5rem] h-screen transition-transform translate-x-0 border-r-4 lg:translate-x-0 border-gray-700 flex flex-col gap-10"
        style={{ paddingTop: "70px" }}
      >
        <div className="flex justify-center">
          <p className="text-white font-semibold text-xl">Project Management</p>
        </div>
        <div className="flex flex-col gap-3">
          {allowedRoutes.map((links, index) => (
            <StyledLink
              href={links.link}
              key={index}
              className="flex flex-row gap-5 border-white p-5 text-white hover:bg-blue-900 transition-all duration-200"
            >
              {links.name}
            </StyledLink>
          ))}
        </div>
      </aside>
    </>
  );
}
