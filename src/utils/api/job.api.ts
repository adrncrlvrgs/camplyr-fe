import { api } from "../instance/instance";

export const addJob = async(data: object)=>{
   return await api("POST", `/post/addJob`, data);
}