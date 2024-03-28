import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GetTasks(projectId: string | null | undefined) {
  try {
    const response = await axiosInstance.get(`${BACKEND_URL}/api/tasks`, {
      params: { projectId: projectId },
    });
    const { data } = response;
    console.log(data);
    return data;
  } catch (error) {
    return handleAxiosError(
      error,
      500,
      "ERROR_GETTING_TASKS",
      "Please try again later."
    );
  }
}

export async function GetTasksBreakdown(projectId: string | null | undefined) {
  try {
    const response = await axiosInstance.get(
      `${BACKEND_URL}/api/tasksbreakdown`,
      { params: { projectId: projectId } }
    );
    const { data } = response;
    console.log(data);
    return data;
  } catch (error) {
    return handleAxiosError(
      error,
      500,
      "ERROR_GETTING_TASKS_BREAKDOWN",
      "Please try again later."
    );
  }
}

export async function GetTasksTimeline(projectId: string | null | undefined) {
  try {
    const response = await axiosInstance.get(
      `${BACKEND_URL}/api/taskstimeline`,
      { params: { projectId: projectId } }
    );
    const { data } = response;
    console.log(data);
    return data;
  } catch (error) {
    return handleAxiosError(
      error,
      500,
      "ERROR_GETTING_TASKS_TIMELINE",
      "Please try again later."
    );
  }
}

export async function GetTaskById(taskId: string) {
  try {
    const response = await axiosInstance.get(`${BACKEND_URL}/api/taskById`, {
      params: { taskId: taskId },
    });
    const { data } = response;
    return data;
  } catch (error) {
    return handleAxiosError(
      error,
      500,
      "ERROR_GETTING_TASK",
      "Please try again later."
    );
  }
}

export async function AddTask(
  tasktitle: string,
  taskDesc: string,
  taskDueDate: string,
  creatorUserId: string | null | undefined,
  projectId: string,
  status?: string,
  priority?: number
) {
  const today = new Date();
  try {
    const response = await axiosInstance.post(`${BACKEND_URL}/api/addTask`, {
      title: tasktitle,
      description: taskDesc as string,
      dueDate: taskDueDate as string,
      createdOn: today.toISOString().split("T")[0] as string,
      createdBy: creatorUserId as string,
      projectId: projectId,
      status: status || ("TODO" as string),
      priority: priority || 0,
      assigneeId: "",
    });
    const { data } = response;
    return data;
  } catch (error) {
    return handleAxiosError(
      error,
      500,
      "ERROR_CREATING_TASKS",
      "Please try again later."
    );
  }
}

// export async function assignCollaborator(userId: string, taskId: string) {
//   try {
//     const response = await axiosInstance.post(
//       `${BACKEND_URL}/api/assignCollaborator`,
//       {
//         userId: userId,
//         taskId: taskId
//       }
//     );
//     const { data } = response;
//     return data;
//   } catch (error) {
//     return handleAxiosError(
//       error,
//       500,
//       "ASIGNEE_API_ERROR",
//       "Please try again later."
//     );
//   }
// }

export async function UpdateTask(
  taskId: string,
  status: string,
  priority: number,
  assigneeId: string
) {
  const today = new Date();
  console.log("call", taskId, status, priority, assigneeId, {
    status: status as string,
    priority: priority || 0,
    assigneeId: assigneeId as string,
  });
  try {
    const response = await axiosInstance.put(
      `${BACKEND_URL}/api/updateTask/${taskId}`,
      {
        status: status as string,
        priority: priority || 0,
        assigneeId: assigneeId as string,
      }
    );
    const { data } = response;
    return data;
  } catch (error) {
    return handleAxiosError(
      error,
      500,
      "ERROR_UPDATING_TASKS",
      "Please try again later."
    );
  }
}
