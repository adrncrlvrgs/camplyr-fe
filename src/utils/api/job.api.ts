import { api } from "../instance/instance";
import { Jobs, ApiResponse } from "../constant/types";

export const addJob = async(data: object)=>{
   return await api("POST", `/job/addJob`, data);
}

export const getAllJobs = async(): Promise<Jobs[]> =>{
   const result = await api<ApiResponse<Jobs[]>>("GET", "/job/allJobs");
  return result.data;
}