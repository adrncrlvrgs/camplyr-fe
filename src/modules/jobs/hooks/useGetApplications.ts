import { useState, useEffect, useCallback } from "react";
import type { Application } from "@/utils/constant/types";
import { getSeekerApplications } from "@/utils/api/application.api";

export function useGetApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchApplications = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getSeekerApplications();
      setApplications(data); // no cast needed
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    applications,
    isLoading,
    serverError: error,
    refetchApplications: fetchApplications,
  };
}


