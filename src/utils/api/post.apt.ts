import { api } from "../instance/instance";
import { Post, ApiResponse } from "../constant/types";

export const addPost = async(data: object)=>{
   return await api("POST", `/post/addPost`, data);
}

export const getAllPost = async(): Promise<Post[]> =>{
   const result =  await api<ApiResponse<Post[]>>("GET", `/post/getAllPost`);
   return result.data;
}

// get
// update
// delete