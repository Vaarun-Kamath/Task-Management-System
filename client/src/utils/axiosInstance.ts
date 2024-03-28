import axios, { isAxiosError } from "axios";

const axiosInstance = axios.create({
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default axiosInstance;

export function handleAxiosError(
  error: unknown,
  statusCode: number,
  errorCode: string,
  errorMessage: string
) {
  if (isAxiosError(error) && error.response) {
    const { status, errorCode, errorMessage } = error.response.data;
    return { status, errorCode, errorMessage };
  } else {
    console.error(error);
    return {
      status: statusCode,
      errorCode: errorCode,
      errorMessage: errorMessage,
    };
  }
}
