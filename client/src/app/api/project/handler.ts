import { isAxiosError } from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { Project } from "@/types/project";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GetProjects(user_id: string | null | undefined) {
  try {
    const response = await axiosInstance.get(`${BACKEND_URL}/api/projects`, {
      params: {
        user_id: user_id,
      },
    });
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
        errorCode: "ERROR_GETTING_PROJECTS",
        errorMessage: "Please try again later.",
      };
    }
  }
}

export async function GetProjectById(project_id: string) {
  try {
    const response = await axiosInstance.get(`${BACKEND_URL}/api/projectById`, {
      params: {
        project_id: project_id,
      },
    });
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
        errorCode: "ERROR_GETTING_PROJECTS",
        errorMessage: "Please try again later.",
      };
    }
  }
}

export async function AddProject(
  projectName: string,
  projectDesc: string,
  projectDeadline: string,
  createdUserId: string | null | undefined
) {
  const today = new Date();
  try {
    // console.log(project);
    const response = await axiosInstance.post(`${BACKEND_URL}/api/addProject`, {
      name: projectName,
      description: projectDesc as string,
      deadline: projectDeadline as string,
      createdOn: today.toISOString().split("T")[0] as string,
      backlog: "" as string,
      timeline: "" as string,
      createdBy: createdUserId as string,
      collaborators: [],
      tasks: [],
      statistics: "" as string,
    });
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
        errorCode: "ERROR_CREATING_PROJECTS",
        errorMessage: "Please try again later.",
      };
    }
  }
}

export async function AddCollaborator(username: string, projectId: string) {
  try {
    const response = await axiosInstance.post(
      `${BACKEND_URL}/api/addCollaborator`,
      {
        username: username,
        projectId: projectId,
      }
    );
    console.log("GetProjectById_response:: ", response);
    const { data } = response;
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log("GetProjectById_error:: ", error);
      const { status, errorCode, errorMessage } = error.response.data;
      return { status, errorCode, errorMessage };
    } else {
      console.error(error);
      return {
        status: 500,
        errorCode: "COLLABORATOR_ADDITION_API_ERROR",
        errorMessage: "Please try again later.",
      };
    }
  }
}
