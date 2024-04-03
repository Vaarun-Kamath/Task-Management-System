"use client";

import { GetProjectById } from "@/app/api/project/handler";
import { GetTasks, GetTasksSorted } from '@/app/api/task/handler';
import { GetUserById } from '@/app/api/user/handler';
import DynamicSwatch from '@/components/atoms/DynamicSwatch';
import ProjectHeader from '@/components/atoms/ProjectHeader';
import TimelineTask from '@/components/atoms/TimeLineTask';
import ProjectNav from '@/components/nav/ProjectNav';
import { months } from '@/constants/Months';
import { ProjectType, UserDetails, Task } from '@/types';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react';

export default function TimelinePage({
  params,
}: {
  params: { 'project-details': string };
}) {
  const { 'project-details': projectId } = params;
  const [project, setProject] = useState<ProjectType | null>(null);
  const [creator, setCreator] = useState<UserDetails | null>(null);
  const [tasks, setTasks] = useState<Task[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/`);
    },
  });

  useLayoutEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await GetProjectById(projectId);
        if (response.errorCode) {
          console.log('Error getting project', response);
          router.push('/404');
        } else {
          setLoading(false);
          setProject(response.content);

          try {
            const respCreator = await GetUserById(response.content.createdBy);
            if (respCreator.errorCode)
              console.log('Error getting projectCreator', respCreator);
            else setCreator(respCreator.content);
          } catch (error) {
            console.error('Error fetching data[User]:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching data[Project]:', error);
      }
    };

    fetchProjectData();
  }, [session, projectId, router]);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        if (projectId) {
          const response = await GetTasksSorted(projectId, 355_000_000);
          console.log(response, response.content);
          setTasks(response.content);
        }
      } catch (error) {
        console.error('Error fetching data[Tasks]:', error);
      }
    };

    fetchTaskData();
  }, [session, projectId]);

  return (
    <div
      className=' overflow-y-hidden h-screen'
      style={{ scrollbarWidth: 'none' }}
    >
      <ProjectHeader project={project} creator={creator} />
      <ProjectNav projectId={projectId} remove='timeline' />

      <div className='gap-1 w-full h-full relative rounded-lg mt-3 bg-slate-200 p-1'>
        {/* Header */}
        <div className='flex flex-row opacity-50'>
          {months.map((month) => (
            <div
              className='w-1/12 text-center border-l-2 border-r-2 border-b-2 border-gray-600 pb-2 m-0'
              key={month}
            >
              {month}
            </div>
          ))}
        </div>

        <br />

        {/* Vertical line indicating current day */}
        <div
          style={{
            left: (new Date().getTime() - 1704067200000) / 316224000 + '%',
          }}
          className='w-0.5 h-full absolute top-0 z--10 min-w-0.25 border-dashed border-red-600 border-l-2'
        />

        {/* Displays all the tasks */}
        <div className='w-full h-full relative'>
          {tasks.map((tasklist, index) =>
            tasklist.map((task) => (
              <TimelineTask task={task} index={index} key={task.id} />
            ))
          )}
        </div>
      </div>
      <DynamicSwatch />
    </div>
  );
}
