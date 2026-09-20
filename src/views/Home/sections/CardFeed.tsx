import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardWritePost from "../sections/CardWritePost";
import CardPost from "@/views/Home/sections/CardPost";
import CardJob from "./CardJob";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { useGetJobs } from "@/modules/jobs/hooks/useGetJobs";
import { useGetPosts } from "@/modules/post/hooks/useGetPosts";
import type { Jobs } from "@/utils/constant/types";
import { cn } from "@/utils/lib/utils";

const JOB_SKELETON_COUNT = 3;
const POST_SKELETON_COUNT = 2;

const JOB_CARD_WIDTH = "w-[85%] flex-shrink-0 sm:w-[460px]";

const RAIL_FADE_MASK =
  "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)";

const RAIL_STYLE: CSSProperties = {
  maskImage: RAIL_FADE_MASK,
  WebkitMaskImage: RAIL_FADE_MASK,
};


const Divider = ({ className }: { className?: string }) => (
  <hr className={cn("w-full border-0 border-t border-dashed border-neutral-300", className)} />
);

const EmptyMessage = ({ children }: { children: ReactNode }) => (
  <p className="py-8 text-center text-sm text-muted-foreground">{children}</p>
);

// Makes a div[role="button"] respond to Enter / Space like a real button.
const onActivateKey = (action: () => void) => (event: KeyboardEvent<HTMLElement>) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    action();
  }
};


type RailButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
};

const RailButton = ({ direction, onClick }: RailButtonProps) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Scroll jobs ${direction}`}
      className="rounded-full border border-neutral-200 p-1 text-neutral-500 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <Icon size={16} />
    </button>
  );
};

type JobsRailProps = {
  jobs: Jobs[];
  isLoading: boolean;
  onSelect: (job: Jobs) => void;
};

const JobsRail = ({ jobs, isLoading, onSelect }: JobsRailProps) => {
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

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-neutral-700">Jobs for you</h3>

        {!isLoading && (
          <div className="hidden gap-1 sm:flex">
            <RailButton direction="left" onClick={() => scrollRail("left")} />
            <RailButton direction="right" onClick={() => scrollRail("right")} />
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex gap-4 overflow-hidden px-1 pb-3">
          {Array.from({ length: JOB_SKELETON_COUNT }).map((_, i) => (
            <div
              key={i}
              className={cn("h-40 animate-pulse rounded-xl bg-neutral-100", JOB_CARD_WIDTH)}
            />
          ))}
        </div>
      ) : (
        <div
          ref={railRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3"
          style={RAIL_STYLE}
        >
          {jobs.map((job) => (
            <div
              key={job.id}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              onClick={() => onSelect(job)}
              onKeyDown={onActivateKey(() => onSelect(job))}
              className={cn(
                "cursor-pointer snap-start rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                JOB_CARD_WIDTH,
              )}
            >
              <CardJob jobs={job} />
            </div>
          ))}
        </div>
      )}

      <Divider className="mt-1" />
    </div>
  );
};

type JobApplyDialogProps = {
  job: Jobs | null;
  onClose: () => void;
};

const JobApplyDialog = ({ job, onClose }: JobApplyDialogProps) => (
  <Dialog
    open={job !== null}
    onOpenChange={(open) => {
      if (!open) onClose();
    }}
  >
    <DialogContent className="flex max-h-[90vh] flex-col gap-4 overflow-y-auto sm:max-w-xl">
      {job && (
        <>
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
            <DialogDescription>Submit your application to {job.company.name}.</DialogDescription>
          </DialogHeader>

          {/* <ApplicationForm job={job} /> */}
        </>
      )}
    </DialogContent>
  </Dialog>
);

const JobsSection = () => {
  const { jobs, isLoadingJob } = useGetJobs();
  const [selectedJob, setSelectedJob] = useState<Jobs | null>(null);

  const showRail = isLoadingJob || jobs.length > 0;

  return (
    <>
      {showRail ? (
        <JobsRail jobs={jobs} isLoading={isLoadingJob} onSelect={setSelectedJob} />
      ) : (
        <EmptyMessage>No jobs available right now. Check back soon.</EmptyMessage>
      )}

      <JobApplyDialog job={selectedJob} onClose={() => setSelectedJob(null)} />
    </>
  );
};


const PostsSkeleton = () => (
  <div className="flex w-full flex-col gap-4">
    {Array.from({ length: POST_SKELETON_COUNT }).map((_, i) => (
      <div key={i} className="h-40 w-full animate-pulse rounded-2xl bg-neutral-100" />
    ))}
  </div>
);

const PostsSection = () => {
  const { posts, isLoadingPost } = useGetPosts();

  if (isLoadingPost) return <PostsSkeleton />;

  if (posts.length === 0) {
    return <EmptyMessage>No posts yet. Be the first to share something.</EmptyMessage>;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {posts.map((post) => (
        <CardPost key={post.id} post={post} />
      ))}
    </div>
  );
};


const CardFeed = () => (
  <div className="flex flex-col items-center gap-4 p-4 lg:col-span-2 lg:border-r lg:border-dashed lg:border-neutral-300">
    <CardWritePost />

    <Divider />

    <JobsSection />
    <PostsSection />
  </div>
);

export default CardFeed;