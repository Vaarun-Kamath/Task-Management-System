"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { GetProjectById } from "@/app/api/project/handler";
import { GetTasks } from "@/app/api/task/handler";
import { GetUserById } from "@/app/api/user/handler";
import PageHeader from "@/components/atoms/PageHeader";
import Lane from "@/components/atoms/Lane";
import { TaskCard } from "@/components/cards/TaskCard";
import AddTask from "@/components/modals/addTaskModal";
import STATUSES from "@/constants/TaskStatus";
import { ProjectType, Task, UserDetails } from "@/types";
import { MdAddChart } from "react-icons/md";
import { TaskCollab } from "@/components/modals/addTaskCollabModal";
import { TaskPriority } from "@/components/modals/addTaskPriority";
import { TaskStatus } from "@/components/modals/addTaskStatus";
import { AddCollabModal } from "@/components/modals/addCollabModal";

function whhhhy() {}
export default function ProjectDetails({
  params,
}: {
  params: { "project-details": string };
}) {
  const { "project-details": projectId } = params;
  const [project, setProject] = useState<ProjectType | null>(null);
  const [creator, setCreator] = useState<UserDetails | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [showAddCollabModal, setShowAddCollabModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState<false | Task>(false);
  const [showPriorityModal, setShowPriorityModal] = useState<false | Task>(
    false
  );
  const [showCollabModal, setShowCollabModal] = useState<false | Task>(false);
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/`);
    },
  });
  const user = session?.user;

  useLayoutEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await GetProjectById(projectId);
        if (response.errorCode) {
          console.log("Error getting project", response);
          // window.location.href = "/404";
          router.push("/404");
        } else {
          setLoading(false);
          setProject(response.content);

          try {
            //getting the creator of the project
            const respCreator = await GetUserById(response.content.createdBy);
            if (respCreator.errorCode) {
              console.log("Error getting projectCreator", respCreator);
            } else {
              setCreator(respCreator.content);
            }
          } catch (error) {
            console.error("Error fetching data[User]:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching data[Project]:", error);
      }
    };

    fetchProjectData();
  }, [session, projectId, router]);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        if (projectId) {
          const response = await GetTasks(projectId);
          console.log(response, response.content); /////////////////
          setTasks(response.content);
        }
      } catch (error) {
        console.error("Error fetching data[Tasks]:", error);
      }
    };

    fetchTaskData();
  }, [session, projectId]);
  const handleStatus: React.Dispatch<React.SetStateAction<boolean>> = (x) => {
    if (!x) setShowStatusModal(x);
  };
  const handlePriority: React.Dispatch<React.SetStateAction<boolean>> = (x) => {
    if (!x) setShowPriorityModal(x);
  };
  const handleCollab: React.Dispatch<React.SetStateAction<boolean>> = (x) => {
    if (!x) setShowCollabModal(x);
  };
  return (
    <>
      <PageHeader
        title={
          (project?.name || "Project") +
          (creator ? " created by " + creator.username : "")
        }
        tooltip={project?.description}
      />
      {loading ? null : (
        <div className=" z-50 flex flex-col px-2 mb-4 gap-5 w-full items-center">
          {/* <AddCollaboratorSection projectId={projectId} /> */}
          {addTaskModal && (
            <AddTask setShowModal={setAddTaskModal} projectId={projectId} />
          )}
          {showAddCollabModal && (
            <AddCollabModal
              projectId={projectId}
              setShowModal={setShowAddCollabModal}
            />
          )}
          {showStatusModal && (
            <TaskStatus setShowModal={handleStatus} task={showStatusModal} />
          )}
          {showPriorityModal && (
            <TaskPriority
              setShowModal={handlePriority}
              task={showPriorityModal}
            />
          )}
          {showCollabModal && project && (
            <TaskCollab
              setShowModal={handleCollab}
              task={showCollabModal}
              project={project}
            />
          )}
          <div className="w-full flex flex-row gap-3">
            <button
              className={
                "flex border-2 items-center gap-2 px-4 py-1 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200 "
              }
              onClick={() => setAddTaskModal(true)}
            >
              <span>
                <MdAddChart />
              </span>
              Add Task
            </button>
            <button
              className={
                "flex border-2 items-center gap-2 px-4 py-1 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200 "
              }
              onClick={() => setShowAddCollabModal(true)}
            >
              <span>
                <MdAddChart />
              </span>
              Add Collaborator
            </button>
          </div>
          <div
            className="grid md:grid-cols-3 gap-x-3 w-full"
            onContextMenu={whhhhy}
          >
            {STATUSES.map((status, stat_index) => (
              <Lane title={status} key={stat_index}>
                {tasks &&
                  tasks
                    .filter((task) => task.status === status)
                    .sort((taskA, taskB) => taskB.priority - taskA.priority)
                    .map((task, index) => (
                      <TaskCard
                        data={task}
                        key={index}
                        setShowStatusModal={setShowStatusModal}
                        setShowPriorityModal={setShowPriorityModal}
                        setShowCollabModal={setShowCollabModal}
                      />
                    ))}
              </Lane>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
