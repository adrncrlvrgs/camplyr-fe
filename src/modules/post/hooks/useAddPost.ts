import { useState } from "react";
import { addPost } from "@/utils/api/post.apt";
import { PostInput } from "@/utils/validation/validation.schema";

export function useAddPost() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createPost = async (data: PostInput): Promise<void> => {
    try {
      setIsSubmitting(true);
      await addPost(data);
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createPost, isSubmitting, serverError: error };
}
