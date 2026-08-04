import { Page } from "@/components/shared/Layout";
import JobFilters from "./sections/JobFilters";
import JobList from "./sections/JobList";
import JobDetails from "./sections/JobDetails";

export default function JobsPage() {
  return (
    <Page>
      <div className="mx-auto flex min-h-dvh w-full max-w-[85rem] border-x border-dashed border-neutral-400 px-10">
        {/* Filters */}
        <JobFilters />

        {/* Job List */}
        <JobList />

        {/* Job Details */}
        {/* Job Details */}
        {/* Job Details */}{/* Job Details */}{/* Job Details */}
        {/* Job Details */}
        <JobDetails/>
        
      </div>
    </Page>
  );
}
