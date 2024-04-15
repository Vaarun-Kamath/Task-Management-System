"use client";

import React, { useEffect, useLayoutEffect, useState } from 'react';
import StyledLink from './atoms/StyledLink';
import userLinks from '@/constants/UserLinks';
import { signOut, useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import { FaBars } from 'react-icons/fa';
import { GetProjects } from '@/app/api/project/handler';
import { ProjectType } from '@/types';

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });
  const userDetails = session?.user;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showProjects, setShowProjects] = useState(false);
  const [projectList, setProjectList] = useState<ProjectType[] | null>(null);
  const toggleSidebar = () => {
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
  };
  useEffect(() => {
    setLoading(!userDetails);
    const handleOutsideClick = (e: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(e.target as Node) && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [sidebarOpen, userDetails]);

  useEffect(() => {
    const fetchProjectList = async () => {
      try {
        if (userDetails) {
          const response = await GetProjects(userDetails.user_id);
          console.log(response, response.content);
          setProjectList(response.content);
          setShowProjects(true);
          console.log('sssssssssssssesssssionnn: ', userDetails);
          console.log('project: ', response.content);
        }
      } catch (error) {
        console.error('Error fetching data[Projects]:', error);
      }
    };
    fetchProjectList();
  }, [userDetails]);
  return (
    <>
      {loading ? (
        <aside
          id='sidebar'
          className={`fixed select-none lg:relative top-0 left-0 z-40 w-[15rem] lg:w-[17.5rem] h-screen transition-transform pt-10 flex flex-col gap-10 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } border-r lg:translate-x-0 bg-gray-800 border-gray-700`}
        >
          <div className='flex justify-center'>
            <p className='text-white font-semibold text-xl'>
              Project Management
            </p>
          </div>
          <div className='flex flex-col items-center flex-1 gap-10'>
            <button
              className='flex flex-row gap-5 border-white px-5 py-3 w-fit text-white bg-slate-600 hover:bg-red-600 font-bold justify-center rounded transition-all duration-200'
              onClick={() => {
                signOut({ redirect: true, callbackUrl: pathname });
              }}
            >
              Logout
            </button>
          </div>
        </aside>
      ) : (
        <>
          <nav className='lg:hidden select-none fixed top-0 z-50 flex items-center justify-between h-10 w-full px-3 py-1.5 bg-gray-800 border-b border-gray-700 max-w-screen lg:px-5 lg:pl-3'>
            <div className='flex items-center justify-start rtl:justify-end'>
              <button
                type='button'
                onClick={toggleSidebar}
                className='inline-flex items-center p-1.5 text-sm rounded-md lg:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600'
              >
                <span className='sr-only'>Open Sidebar</span>
                <FaBars className='w-5 h-5' />
              </button>
            </div>
          </nav>
          <aside
            id='sidebar'
            className={`fixed select-none lg:relative top-0 left-0 z-40 w-[15rem] lg:w-[17.5rem] h-screen transition-transform pt-10 flex flex-col gap-10 ${
              sidebarOpen
                ? 'translate-x-0'
                : '-translate-x-full lg:translate-x-0'
            } border-r lg:translate-x-0 bg-gray-800 border-gray-700`}
          >
            <div className='flex justify-center'>
              <p className='text-white font-semibold text-xl'>
                Project Management
              </p>
            </div>
            <div className='flex flex-col items-center flex-1 gap-10'>
              <div className='flex flex-col gap-3 w-full'>
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
                      className='flex flex-row gap-5 p-5 text-white hover:bg-gray-700 transition-all duration-200'
                    >
                      {links.name}
                    </StyledLink>
                  )
                )}
                <div className='m-3 rounded-xl border-white border-2 overflow-hidden text-ellipsis'>
                  {showProjects &&
                    projectList?.map((project, index) => (
                      <StyledLink
                        href={`/projects/${project._id}/kanban`}
                        key={index}
                        className='flex flex-row gap-5 p-5 text-white hover:bg-gray-700 transition-all duration-200'
                      >
                        {project.name}
                      </StyledLink>
                    ))}
                </div>
              </div>
              <button
                className='flex flex-row gap-5 border-white px-5 py-3 w-fit text-white bg-slate-600 hover:bg-red-600 font-bold justify-center rounded transition-all duration-200'
                onClick={() => {
                  signOut({ redirect: true, callbackUrl: pathname });
                }}
              >
                Logout
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
