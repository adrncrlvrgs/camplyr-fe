import { api } from "../instance/instance";

export const loginUser = async(data: object)=>{
  return await api("POST", `auth/login`, data);
}