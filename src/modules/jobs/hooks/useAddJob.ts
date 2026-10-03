import { useState, useCallback } from "react";
import { CreateJobInput } from "@/utils/validation/validation.schema";
import { addJob } from "@/utils/api/job.api";

export interface ServerError {
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

// Shape of the error body the backend sends on a failed request.
interface ApiErrorBody {
  message?: string;
  errors?: { fieldErrors?: ServerError["fieldErrors"] };
}

// Pulls the backend's { message, errors } body out of a failed request.
// This assumes an axios-style error (err.response.data). If addJob uses fetch,
// have it throw an Error that carries the parsed body and read it here instead.
function toServerError(err: unknown): ServerError {
  const body = (err as { response?: { data?: ApiErrorBody } })?.response?.data;

  if (body?.message) {
    return {
      message: body.message,
      fieldErrors: body.errors?.fieldErrors,
    };
  }

  return {
    message: err instanceof Error ? err.message : "Something went wrong",
  };
}

export function useAddJob() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<ServerError | null>(null);

  // Resolves to true on success, false on failure, so callers can decide
  // whether to reset local state (e.g. the custom questions).
  const createJob = useCallback(
    async (data: CreateJobInput): Promise<boolean> => {
      console.log(data)
      setIsSubmitting(true);
      setError(null); // clear any previous server error

      try {
        await addJob(data);
        return true;
      } catch (err) {
        setError(toServerError(err));
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { createJob, isSubmitting, serverError: error, clearError };
}