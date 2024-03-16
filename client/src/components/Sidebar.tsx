"use client";

import React from "react";
import StyledLink from "./atoms/StyledLink";
import userLinks from "@/constants/UserLinks";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
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
        <div className="flex flex-col items-center flex-1 gap-10">
          <div className="flex flex-col gap-3 w-full">
            {userLinks.map(
              (
                links: {
                  name: string;
                  link: string;
                },
                index: any
              ) => (
                <StyledLink
                  href={links.link}
                  key={index}
                  className="flex flex-row gap-5 p-5 text-white hover:bg-blue-900 transition-all duration-200"
                >
                  {links.name}
                </StyledLink>
              )
            )}
          </div>
          <button
            className="flex flex-row gap-5 border-white px-5 py-3 w-fit text-white bg-slate-600 hover:bg-red-600 font-bold justify-center rounded transition-all duration-200"
            onClick={() => {
              signOut({ redirect: true, callbackUrl: pathname });
            }}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
