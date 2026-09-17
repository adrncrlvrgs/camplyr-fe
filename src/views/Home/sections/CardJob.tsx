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
        "w-full rounded-2xl border p-3 shadow-sm transition-colors",
        "border-primary/25 bg-gradient-to-b from-primary/[0.03] to-transparent hover:border-primary/40",
      )}
    >
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <div className="flex w-full flex-row justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg font-semibold text-neutral-900">
                {jobs.company.name}
              </span>
              <Badge variant="outline">Recruiter</Badge>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span>Posted {jobs.createdAt}</span>
              <span>·</span>
              <Globe className="h-3.5 w-3.5" />
              <span className="sr-only">Public</span>
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
                isLiked
                  ? "text-rose-500"
                  : "text-neutral-400 hover:text-rose-500",
              )}
            >
              <Heart
                size={18}
                className={isLiked ? "fill-current" : undefined}
              />
            </button>

            <button
              type="button"
              onClick={stopAndRun(() => setIsSaved((v) => !v))}
              aria-pressed={isSaved}
              aria-label={isSaved ? "Remove bookmark" : "Bookmark post"}
              className={cn(
                "rounded-full p-1.5 transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isSaved
                  ? "text-primary"
                  : "text-neutral-400 hover:text-primary",
              )}
            >
              <Bookmark
                size={18}
                className={isSaved ? "fill-current" : undefined}
              />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4 pt-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <BriefcaseBusiness size={12} />
          Hiring
        </span>

        <h3 className="text-lg font-semibold text-neutral-900">{jobs.title}</h3>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>{jobs.company.name}</span>
          {jobs.location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {jobs.location}
            </span>
          )}
        </div>

        {jobs.description && (
          <p className="text-sm text-neutral-700">{jobs.description}</p>
        )}

        <div className="flex items-center justify-end gap-1 pt-1 text-sm font-medium text-primary">
          View job
          <ChevronRight size={16} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CardJob;
