import { api } from "../instance/instance";

export const loginUserGoogle = async(data: object)=>{
  return await api("POST", `/auth/google`, data);
}
