import { useState, useEffect, useCallback } from "react";
import { Jobs } from "@/utils/constant/types";
import { getAllJobs } from "@/utils/api/job.api";

export function useGetJobs() {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [isLoadingJob, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchJobs = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllJobs();
      setJobs(data);
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    isLoadingJob,
    serverError: error,
    refetchJobs: fetchJobs,
  };
}