import { useState } from "react";
import { CreateApplicationInput } from "@/utils/validation/validation.schema";
import { sendApplication } from "@/utils/api/application.api";

export function useSendApplication() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const submitApplication = async (
    data: CreateApplicationInput,
    jobId: string
  ): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      setError(null);
      await sendApplication(data, jobId);
      return true;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitApplication, isSubmitting, serverError: error };
}