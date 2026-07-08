import { api } from "../instance/instance";

export const loginUserGoogle = async(data: object)=>{
  return await api("POST", `/auth/google`, data);
}

export const getUser = async()=>{
  return await api("GET", `/auth/userProfile`);
}
export const refresh = async()=>{
  return await api("POST", `/auth/refresh`);
}

export const logout = async()=>{
  return await api("POST", `/auth/logout`);
}

