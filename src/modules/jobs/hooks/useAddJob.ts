import { useState } from "react";
import { CreateJobInput } from "@/utils/validation/validation.schema";
import { addJob } from "@/utils/api/job.api";

export function useAddJob() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createJob = async (data: CreateJobInput): Promise<void> => {
    try {
      setIsSubmitting(true);
      await addJob(data);
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createJob, isSubmitting, serverError: error };
}
