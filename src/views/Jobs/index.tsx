// JobsPage.tsx
"use client";

import { useState } from "react";
import { Page } from "@/components/shared/Layout";
import JobFilters from "./sections/JobFilters";
import JobList from "./sections/JobList";
import JobDetails from "./sections/JobDetails";
import JobCreate from "./sections/JobCreate";
import { jobs } from "./sections/data";

export default function JobsPage() {
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id ?? "");
  const selectedJob = jobs.find((job) => job.id === selectedJobId) ?? null;

  return (
    <Page>
      <div className="mx-auto flex min-h-dvh w-full max-w-[85rem] flex-col border-x border-dashed border-neutral-400">
        {/* <header className="border-b border-dashed border-neutral-300 px-6 py-6 lg:px-10">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Open Roles
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Jobs
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {jobs.length} positions open right now
          </p>
        </header> */}

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
            selectedJobId={selectedJobId}
            onSelectJob={setSelectedJobId}
          />

          <JobDetails job={selectedJob} />
        </div>
      </div>
    </Page>
  );
}