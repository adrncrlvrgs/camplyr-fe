import { api } from "../instance/instance";
import { ApiResponse, JobDetail, Jobs } from "../constant/types";
import { CreateJobInput } from "@/utils/validation/validation.schema";
 
export const addJob = async (data: CreateJobInput): Promise<JobDetail> => {
  const result = await api<ApiResponse<JobDetail>>("POST", "/job/addJob", data);
  return result.data;
};

export const getAllJobs = async(): Promise<Jobs[]> =>{
   const result = await api<ApiResponse<Jobs[]>>("GET", "/job/allJobs");
  return result.data;
}

export const getJobById = async(jobId:string): Promise<Jobs> =>{
   const result = await api<ApiResponse<Jobs>>("GET", `/job/${jobId}`);
  return result.data;
}