import { ApiResponseType } from "../types.js";

export function apiResponse(
  status: number,
  message: string,
  data?: { [key: string]: any }
): ApiResponseType {
  return {
    status,
    message,
    data,
    success: status >= 200 && status < 300,
  };
}
