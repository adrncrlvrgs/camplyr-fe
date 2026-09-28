import { Page } from "@/components/shared/Layout";
import JobDetail from "./sections/JobDetail";
import { useJob } from "@/modules/jobs/hooks/useGetJob";

export default function JobPage() {

const {
    // jobId,
    job,
    isLoading,
    isError,
  } = useJob();

   if (isLoading) {
    return <div>Loading job...</div>;
  }

  if (isError || !job) {
    return <div>Job not found.</div>;
  }
  return (
    <Page>
      <div className="mx-auto flex min-h-dvh w-full max-w-[85rem] flex-col border-x border-dashed border-neutral-400">
        <div className="flex flex-1">
            form here
             <JobDetail job={job}/>
        </div>
      </div>
    </Page>
  );
}

 // option na direct sumbmit nalang ng resume, if employer has no custom question
        //or merong slide and progress bar per q&a
