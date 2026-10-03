import type { Jobs } from "@/utils/constant/types";
import { BriefcaseBusiness } from "lucide-react";
import {
  formatJobType,
  formatSalaryRange,
  formatRelativeTime,
} from "@/utils/constant/jobType";

type JobDetailProps = {
  job: Jobs;
};

export default function JobDetail({ job }: JobDetailProps) {
  return (
    <aside className="hidden w-[420px] shrink-0 p-6 xl:block xl:sticky xl:top-0 xl:max-h-dvh xl:overflow-y-auto bg-[#fcfcfc]">
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-base font-semibold text-neutral-600">
          {job.company.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold tracking-tight">{job.title}</h2>
          <p className="mt-1 text-muted-foreground">
            {job.company.name} • {job.location}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <BriefcaseBusiness size={14} />
          {formatJobType(job.type)}
        </span>
        <span>{formatSalaryRange(job.salaryMin, job.salaryMax)}</span>
        <span>Posted {formatRelativeTime(job.createdAt)}</span>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Job Description
        </h3>
        <p className="text-sm leading-7 text-muted-foreground whitespace-pre-line">
          {job.description}
        </p>
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
