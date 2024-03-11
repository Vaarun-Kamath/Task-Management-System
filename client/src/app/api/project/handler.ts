import { isAxiosError } from "axios";
import axiosInstance from "@/utils/axiosInstance";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GetProjects() {
    try {
        const response = await axiosInstance.get(`${BACKEND_URL}/api/projects`);
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
