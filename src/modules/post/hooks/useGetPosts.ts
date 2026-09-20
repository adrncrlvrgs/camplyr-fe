import { useState, useEffect, useCallback } from "react";
import { Post } from "@/utils/constant/types";
import { getAllPost } from "@/utils/api/post.apt";

export function useGetPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPost, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllPost();
      setPosts(data);
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
    } finally {
      setIsLoading(false);
    }
  },[]);

  useEffect(()=>{
    fetchPosts();
  }, [fetchPosts])

  return {
    posts,
    isLoadingPost,
    serverError: error,
    refetchJobs: fetchPosts,
  };
}
