import { Page } from "@/components/shared/Layout";
import JobFilters from "./sections/JobFilters";
import JobList from "./sections/JobList";
import JobDetails from "./sections/JobDetails";
import JobCreate from "./sections/JobCreate";

export default function JobsPage() {
  return (
    <Page>
      <div className="mx-auto flex min-h-dvh w-full max-w-[85rem] border-x border-dashed border-neutral-400 px-10">
        <aside className="hidden w-72 border-r border-dashed border-neutral-300 p-6 lg:block">
            <JobCreate/>
            <h2 className="mb-6 text-lg font-semibold">Filters</h2>
            <JobFilters />
        </aside>

        {/* Job List */}
        <JobList />
        {/* Job Details */}
        <JobDetails />
      </div>
    </Page>
  );
}
