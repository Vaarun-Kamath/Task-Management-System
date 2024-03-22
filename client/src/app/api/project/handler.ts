import { isAxiosError } from "axios";
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";
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
    return handleAxiosError(
      error, 
      500, 
      "ERROR_GETTING_PROJECTS", 
      "Please try again later."
    );
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
    return handleAxiosError(
      error,
      500,
      "ERROR_GETTING_PROJECT",
      "Please try again later."
    );
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
    return handleAxiosError(
      error,
      500,
      "ERROR_CREATING_PROJECT",
      "Please try again later.");
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
    return handleAxiosError(
      error,
      500,
      "COLLABORATOR_ADDITION_API_ERROR",
      "Please try again later."
    );
  }
}
