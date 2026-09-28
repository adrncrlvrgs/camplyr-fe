import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getJobById } from "@/utils/api/job.api";

export function useJob() {
  const { jobId } = useParams<{ jobId: string }>();

  const query = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobById(jobId!),
    enabled: Boolean(jobId),
  });

  return {
    jobId,
    job: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}