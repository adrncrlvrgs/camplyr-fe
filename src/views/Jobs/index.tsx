"use client";

import { useState } from "react";
import { Page } from "@/components/shared/Layout";
import JobFilters from "./sections/JobFilters";
import JobList from "./sections/JobList";
import JobDetails from "./sections/JobDetails";
import JobCreate from "./sections/JobCreate";
import { useGetJobs } from "@/modules/jobs/hooks/useGetJobs";
import { useGetApplications } from "@/modules/jobs/hooks/useGetApplications";

export default function JobsPage() {
  const { jobs, isLoading: isLoadingJobs } = useGetJobs();
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const selectedJob = jobs.find((job) => job.id === selectedJobId) ?? jobs[0] ?? null;

  const { applications, isLoading: isLoadingApplications, refetchApplications } = useGetApplications();

  return (
    <Page>
      <div className="mx-auto flex min-h-dvh w-full max-w-[85rem] flex-col border-x border-dashed border-neutral-400">
        <div className="flex flex-1">
          <aside className="hidden w-72 shrink-0 border-r border-dashed border-neutral-300 p-6 lg:sticky lg:top-0 lg:block lg:max-h-dvh lg:overflow-y-auto">
            <JobCreate />
            <h2 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Filters
            </h2>
            <JobFilters />
          </aside>

          <JobList
            jobs={jobs}
            selectedJobId={selectedJob?.id ?? ""}
            onSelectJob={setSelectedJobId}
            isLoading={isLoadingJobs}
          />

          <JobDetails
            job={selectedJob}
            applications={applications}
            isLoadingApplications={isLoadingApplications}
            onApplicationSubmitted={refetchApplications}
          />
        </div>
      </div>
    </Page>
  );
}