"use client";

import { useState, type MouseEvent } from "react";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Globe,
  Bookmark,
  Heart,
  BriefcaseBusiness,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/utils/lib/utils";
import type { Jobs } from "@/utils/constant/types";

type JobProps = {
  jobs: Jobs;
  //   selectedJobId: string;
  //   onSelectJob: (id: string) => void;
  //   isLoading?: boolean;
};

const CardJob = ({ jobs }: JobProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const stopAndRun = (fn: () => void) => (event: MouseEvent) => {
    event.stopPropagation();
    fn();
  };
  return (
    <Card
      className={cn(
        // One layer of padding (p-4) and an explicit small gap. Header/content
        // below use p-0 so their own default padding can't stack on top.
        // h-full so every card in the rail matches the tallest one.
        "flex h-full w-full flex-col gap-2 rounded-2xl border p-4 shadow-sm transition-colors",
        "border-primary/25 bg-gradient-to-b from-primary/[0.03] to-transparent hover:border-primary/40",
      )}
    >
      {/* Title + company/location on the left, actions on the right */}
      <CardHeader className="flex flex-row items-start justify-between gap-3 p-0">
        <div className="min-w-0">
          <h3
            className="line-clamp-1 text-lg font-semibold text-neutral-900"
            title={jobs.title}
          >
            {jobs.title}
          </h3>

          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <span className="font-medium text-neutral-700">
              {jobs.company.name}
            </span>
            <Badge variant="outline">Recruiter</Badge>
            {jobs.location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {jobs.location}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-row gap-1">
          <button
            type="button"
            onClick={stopAndRun(() => setIsLiked((v) => !v))}
            aria-pressed={isLiked}
            aria-label={isLiked ? "Unlike post" : "Like post"}
            className={cn(
              "rounded-full p-1.5 transition hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isLiked ? "text-rose-500" : "text-neutral-400 hover:text-rose-500",
            )}
          >
            <Heart size={18} className={isLiked ? "fill-current" : undefined} />
          </button>

          <button
            type="button"
            onClick={stopAndRun(() => setIsSaved((v) => !v))}
            aria-pressed={isSaved}
            aria-label={isSaved ? "Remove bookmark" : "Bookmark post"}
            className={cn(
              "rounded-full p-1.5 transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isSaved ? "text-primary" : "text-neutral-400 hover:text-primary",
            )}
          >
            <Bookmark
              size={18}
              className={isSaved ? "fill-current" : undefined}
            />
          </button>
        </div>
      </CardHeader>

      {jobs.description && (
        <CardContent className="p-0">
          <p className="line-clamp-2 text-sm text-neutral-700">
            {jobs.description}
          </p>
        </CardContent>
      )}

      {/* Footer: hiring pill + posted date on the left, "View job" on the right */}
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <BriefcaseBusiness size={12} />
          Hiring
        </span>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Posted {jobs.createdAt}</span>
          <span>·</span>
          <Globe className="h-3.5 w-3.5" />
          <span className="sr-only">Public</span>
        </div>

        <span className="ml-auto flex items-center gap-1 text-sm font-medium text-primary">
          View job
          <ChevronRight size={16} />
        </span>
      </div>
    </Card>
  );
};

export default CardJob;