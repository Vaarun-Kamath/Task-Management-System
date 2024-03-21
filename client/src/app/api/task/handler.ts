import { isAxiosError } from "axios";
import axiosInstance from "@/utils/axiosInstance";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GetTasks(projectId: string | null | undefined) {
    try {
        const response = await axiosInstance.get(
          `${BACKEND_URL}/api/tasks`,
          { params: { projectId: projectId }}
        );
        const { data } = response;
        console.log(data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const { status, errorCode, errorMessage } = error.response.data;
            return { status, errorCode, errorMessage };
        } else {
            console.error(error);
            return {
                status: 500,
                errorCode: "ERROR_GETTING_TASKS",
                errorMessage: "Please try again later.",
            };
        }
    }
}

export async function GetTaskById(taskId: string) {
  try {
    const response = await axiosInstance.get(
      `${BACKEND_URL}/api/taskById`, {
      params: { taskId: taskId }}
    );
    const { data } = response;
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const { status, errorCode, errorMessage } = error.response.data;
      return { status, errorCode, errorMessage };
    } else {
      console.error(error);
      return {
        status: 500,
        errorCode: "ERROR_GETTING_TASK",
        errorMessage: "Please try again later.",
      };
    }
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
    // console.log(project);
    const response = await axiosInstance.post(
      `${BACKEND_URL}/api/addTask`,
      {
        title: tasktitle,
        description: taskDesc as string,
        dueDate: taskDueDate as string,
        createdOn: today.toISOString().split("T")[0] as string,
        createdBy: creatorUserId as string,
        projectId: projectId,
        status: status || "TODO" as string,
        priority: priority || 0,
        assignees: [],
      }
    );
    const { data } = response;
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const { status, errorCode, errorMessage } = error.response.data;
      return { status, errorCode, errorMessage };
    } else {
      console.error(error);
      return {
        status: 500,
        errorCode: "ERROR_CREATING_TASKS",
        errorMessage: "Please try again later.",
      };
    }
  }
}

export async function assignCollaborator(userId: string, taskId: string) {
  try {
    const response = await axiosInstance.post(
      `${BACKEND_URL}/api/assignCollaborator`,
      {
        userId: userId,
        taskId: taskId
      }
    );
    const { data } = response;
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const { status, errorCode, errorMessage } = error.response.data;
      return { status, errorCode, errorMessage };
    } else {
      console.error(error);
      return {
        status: 500,
        errorCode: "ASIGNEE_API_ERROR",
        errorMessage: "Please try again later.",
      };
    }
  }
}
