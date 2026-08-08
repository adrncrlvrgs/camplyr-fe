import { useState } from "react";
// import { addPost } from "@/utils/api/post.apt";
// import { PostInput } from "@/utils/validation/validation.schema";

export function useAddJob() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  return { isSubmitting, serverError: error };
}
