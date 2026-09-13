import { api } from "../instance/instance";
import { Application, ApiResponse } from "../constant/types";
import { CreateApplicationInput } from "../validation/validation.schema";

 export const sendApplication = async (
     data: CreateApplicationInput,
   jobId: string
 ): Promise<Application> => {
   const result = await api<ApiResponse<Application>>("POST", `/application/apply/${jobId}`, data);
   return result.data;
 };

export const getSeekerApplications = async (): Promise<Application[]> => {
  const result = await api<ApiResponse<Application[]>>("GET", "/application/me");
  return result.data;
};

export const getJobApplications = async (jobId: string): Promise<Application[]> => {
  const result = await api<ApiResponse<Application[]>>("GET", `/application/job/${jobId}`);
  return result.data;
};

export const updateApplicationStatus = async (
  applicationId: string,
  data: object
): Promise<Application> => {
  const result = await api<ApiResponse<Application>>(
    "PATCH",
    `/application/${applicationId}/status`,
    data
  );
  return result.data;
};

export const withdrawApplication = async (applicationId: string) => {
  return await api<ApiResponse<null>>("DELETE", `/application/${applicationId}`);
};