import { api } from "../instance/instance";
import { Post, ApiResponse, PaginatedPostsResponse } from "../constant/types";

export const addPost = async(data: object)=>{
   return await api<ApiResponse<Post>>("POST", `/post/addPost`, data);
}

export const getAllPost = async({cursor, limit = 10}:{cursor?: string, limit?: number}): Promise<PaginatedPostsResponse<Post[]>> =>{
   const params = new URLSearchParams();
    if (cursor) params.set("cursor", cursor);
    params.set("limit", String(limit));
   const result = await api<ApiResponse<PaginatedPostsResponse<Post[]>>>(
        "GET",
        `/post/getAllPost?${params.toString()}`
    );
   return result.data;
}

// get
// update
// delete