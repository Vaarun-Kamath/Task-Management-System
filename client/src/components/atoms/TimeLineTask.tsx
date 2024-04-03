import { GetUserById } from '@/app/api/user/handler';
import { Task, UserDetails } from '@/types';
import { getColour, getColourStatus, timeInSec } from '@/utils/helperFunctions';
import { useEffect, useState } from 'react';

export default function TimelineTask({
  task,
  index,
}: {
  task: Task;
  index: number;
}) {
  const [loadText, setText] = useState<boolean>(false);
  const [fullDisplay, setDisplay] = useState<boolean>(false);
  const [collaborator, setCollaborator] = useState<UserDetails | null>(null);
  var startTime = timeInSec(task.createdOn);
  var endTime = timeInSec(task.dueDate);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        if (task.assigneeId) {
          const response = await GetUserById(task.assigneeId);
          console.log(response, response.content); /////////////////
          setCollaborator(response.content);
        }
      } catch (error) {
        console.error('Error fetching data[Tasks]:', error);
      }
    };

    fetchTaskData();
  }, [task.assigneeId]);

  return (
    <div
      onMouseDown={() => setDisplay(true)}
      onMouseUp={() => setDisplay(false)}
      onMouseEnter={() => setText(true)}
      onMouseLeave={() => {
        setDisplay(false);
        setText(false);
      }}
      title={task.description}
      style={{
        left: (startTime - 1704067200000) / 316224000 + '%',
        top: index * 38 + 'px',
        minWidth: (endTime - startTime) / 316224000 + '%',
      }}
      className={`
        font-bold border-2 rounded-md scroll-m-0 scroll-p-0
        absolute translate-x--1/2 justify-center text-center
        bg-gray-700 text-gray-700 border-${getColourStatus(task.status)}-500 
        hover:bg-gray-700 hover:text-${getColour(task.priority)}-500
        hover:rounded-md hover:w-fit hover:z-50 hover:h-fit
        p-1 ps-2 pe-2 w-1 h-9 min-h-9 select-none`}
    >
      {loadText && task.title}
      {fullDisplay && (
        <div className=' text-white'>
          <cite className=' font-normal'>{task.description}</cite>
          {task.assigneeId && (
            <p className='text-md text-gray-500 hover:text-gray-300 ml-2 text-wrap line-clamp-1'>
              {'Assignee: ' + collaborator?.username || task.assigneeId}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
