import { useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardWritePost from "../sections/CardWritePost";
// import CardPost from "@/views/Home/sections/CardPost";
import CardJob from "./CardJob";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { useGetJobs } from "@/modules/jobs/hooks/useGetJobs";
import type { Jobs } from "@/utils/constant/types";

const JOB_SKELETON_COUNT = 3;

const CardFeed = () => {
const [selectedJob, setSelectedJob] = useState<Jobs | null>(null);
  const { jobs, isLoading } = useGetJobs();
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRail = (direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;
    const amount = rail.clientWidth * 0.9;
    rail.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleCardKeyDown =
    (job: Jobs) => (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setSelectedJob(job);
      }
    };
return(
  <div className="flex flex-col items-center gap-4 p-4 lg:col-span-2 lg:border-r lg:border-dashed lg:border-neutral-300">
    <CardWritePost />

    <hr className="w-full border-0 border-t border-dashed border-neutral-300" />

    {isLoading ? (
        <div className="w-full">
          <div className="mb-3 flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-neutral-700">
              Jobs for you
            </h3>
          </div>

          <div className="flex gap-4 overflow-hidden px-1 pb-3">
            {Array.from({ length: JOB_SKELETON_COUNT }).map((_, i) => (
              <div
                key={i}
                className="h-40 w-[85%] flex-shrink-0 animate-pulse rounded-xl bg-neutral-100 sm:w-[380px]"
              />
            ))}
          </div>

          <hr className="mt-1 w-full border-0 border-t border-dashed border-neutral-300" />
        </div>
      ) : jobs.length > 0 ? (
        <div className="w-full">
          <div className="mb-3 flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-neutral-700">
              Jobs for you
            </h3>

            <div className="hidden gap-1 sm:flex">
              <button
                type="button"
                onClick={() => scrollRail("left")}
                aria-label="Scroll jobs left"
                className="rounded-full border border-neutral-200 p-1 text-neutral-500 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollRail("right")}
                aria-label="Scroll jobs right"
                className="rounded-full border border-neutral-200 p-1 text-neutral-500 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={railRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            {jobs.map((job) => (
              <div
                key={job.id}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                onClick={() => setSelectedJob(job)}
                onKeyDown={handleCardKeyDown(job)}
                className="w-[85%] flex-shrink-0 cursor-pointer snap-start rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-[380px]"
              >
                <CardJob jobs={job} />
              </div>
            ))}
          </div>

          <hr className="mt-1 w-full border-0 border-t border-dashed border-neutral-300" />
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No jobs available right now. Check back soon.
        </p>
      )}

    {/* {feedPosts.length > 0 ? (
      feedPosts.map((post) => (
        <div
          key={post.id}
          role="button"
          tabIndex={0}
          aria-haspopup="dialog"
          onClick={() => setSelectedPost(post)}
          onKeyDown={handleCardKeyDown(post)}
          className="w-full cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <CardPost post={post} />
        </div>
      ))
    ) : (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No posts yet. Be the first to share something.
      </p>
    )} */}
    <Dialog
        open={selectedJob !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedJob(null);
        }}
      >
        <DialogContent className="flex max-h-[90vh] flex-col gap-4 overflow-y-auto sm:max-w-xl">
          {selectedJob &&(
            <>
              <DialogHeader>
                <DialogTitle>Apply for {selectedJob.title}</DialogTitle>
                <DialogDescription>
                  Submit your application to {selectedJob.company.name}.
                </DialogDescription>
              </DialogHeader>

              {/* <ApplicationForm job={selectedPost} /> */}
            </>
          )}
        </DialogContent>
      </Dialog>
  </div>
  );
};

export default CardFeed;
