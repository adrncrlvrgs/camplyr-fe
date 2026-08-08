import { api } from "../instance/instance";

export const addPost = async(data: object)=>{
   return await api("POST", `/post/addPost`, data);
}

// get
// update
// delete