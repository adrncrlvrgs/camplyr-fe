"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  BriefcaseBusiness,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import type { Job } from "./data";

type JobListProps = {
  jobs: Job[];
  selectedJobId: string;
  onSelectJob: (id: string) => void;
};

export default function JobList({ jobs, selectedJobId, onSelectJob }: JobListProps) {
  const [query, setQuery] = useState("");

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <section className="flex-1 border-r border-dashed border-neutral-300">
      <div className="sticky top-0 z-10 border-b border-dashed border-neutral-300 bg-background/95 p-5 backdrop-blur">
        <form onSubmit={(e) => e.preventDefault()} role="search" className="flex gap-3">
          <label htmlFor="job-search" className="sr-only">
            Search jobs
          </label>
          <Input
            id="job-search"
            placeholder="Search jobs..."
            className="flex-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button type="submit" size="icon" aria-label="Search">
            <Search size={18} />
          </Button>

          <Button type="button" variant="outline" size="icon" aria-label="Show filters">
            <SlidersHorizontal size={18} />
          </Button>
        </form>

        <p className="mt-3 text-xs text-muted-foreground">
          Showing {filteredJobs.length} of {jobs.length} roles
        </p>
      </div>

      <ul className="space-y-3 p-5">
        {filteredJobs.map((job) => {
          const isSelected = job.id === selectedJobId;

          return (
            <li key={job.id}>
              <button
                type="button"
                onClick={() => onSelectJob(job.id)}
                aria-pressed={isSelected}
                className={`bg-[#fcfcfc] w-full rounded-xl border p-5 text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isSelected
                    ? "border-primary bg-primary/[0.04] shadow-sm"
                    : "border-neutral-200 hover:border-primary/60 hover:bg-muted/40"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-sm font-semibold text-neutral-600">
                    {job.company.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold">{job.title}</h3>
                        <p className="mt-0.5 text-sm text-muted-foreground">{job.company}</p>
                      </div>

                      {job.isNew && (
                        <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          New
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <BriefcaseBusiness size={14} />
                        {job.type}
                      </span>
                      <span>{job.salary}</span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                      {job.description}
                    </p>

                    <p className="mt-3 text-xs text-muted-foreground">Posted {job.postedAt}</p>
                  </div>
                </div>
              </button>
            </li>
          );
        })}

        {filteredJobs.length === 0 && (
          <li className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-sm text-muted-foreground">
            No roles match "{query}". Try a different search.
          </li>
        )}
      </ul>
    </section>
  );
}