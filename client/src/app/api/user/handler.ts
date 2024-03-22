import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export async function GetUserById(userId: string) {
  // only name and email
  try {
    const response = await axiosInstance.get(
      `${BACKEND_URL}/api/userById`, {
      params: { userId: userId }}
    );
    const { data } = response;
    return data;
  } catch (error) {
    return handleAxiosError(
        error,
        500,
        "ERROR_GETTING_USER",
        "Please try again later."
    );
  }
}
