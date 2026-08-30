"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Bookmark, BriefcaseBusiness } from "lucide-react";
import type { Job } from "./data";

type JobDetailsProps = {
  job: Job | null;
};

export default function JobDetails({ job }: JobDetailsProps) {
  const [isSaved, setIsSaved] = useState(false);

  if (!job) {
    return (
      <aside className="hidden w-[420px] shrink-0 items-center justify-center p-6 text-center xl:flex xl:sticky xl:top-0 xl:max-h-dvh">
        <p className="text-sm text-muted-foreground">
          Select a role from the list to see the full description.
        </p>
      </aside>
    );
  }

  return (
    <aside className="hidden w-[420px] shrink-0 p-6 xl:block xl:sticky xl:top-0 xl:max-h-dvh xl:overflow-y-auto bg-[#fcfcfc]">
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-base font-semibold text-neutral-600">
          {job.company.charAt(0)}
        </div>

        <div className="min-w-0">
          <h2 className="text-2xl font-semibold tracking-tight">{job.title}</h2>
          <p className="mt-1 text-muted-foreground">
            {job.company} • {job.location}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <BriefcaseBusiness size={14} />
          {job.type}
        </span>
        <span>{job.salary}</span>
        <span>Posted {job.postedAt}</span>
      </div>

      <div className="mt-6 flex gap-3">
        <Button className="flex-1">Apply Now</Button>

        <Button variant="outline" onClick={() => setIsSaved((prev) => !prev)} aria-pressed={isSaved}>
          <Bookmark size={16} className={isSaved ? "fill-current" : undefined} />
          {isSaved ? "Saved" : "Save Job"}
        </Button>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Job Description
        </h3>
        <p className="text-sm leading-7 text-muted-foreground">{job.description}</p>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Requirements
        </h3>
        <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
          {job.requirements.map((requirement, index) => (
            <li key={`${job.id}-req-${index}`} className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-neutral-400" />
              {requirement}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}