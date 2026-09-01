"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Page } from "@/components/shared/Layout";
import CardPost from "@/views/Home/sections/CardPost";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardProfile from "./sections/CardProfile";
import CardConnectionRecommendation from "./sections/CardConnectionRecommendation";
import CardAnalytics from "./sections/CardAnalytics";
import CardWritePost from "./sections/CardWritePost";
// import ApplicationForm from "@/modules/application/views/ApplicantForm";

type PostType = "JOB" | "POST";

type FeedPost = {
  id: number;
  type: PostType;
  title?: string;
  company?: string;
  location?: string;
  postedAt: string;
};

const posts: FeedPost[] = [
  {
    id: 1,
    type: "JOB",
    title: "Frontend Developer",
    company: "Camplyr Inc.",
    location: "Manila, Philippines",
    postedAt: "2 hours ago",
  },
  {
    id: 2,
    type: "POST",
    postedAt: "2 hours ago",
  },
  {
    id: 3,
    type: "JOB",
    title: "Backend Developer",
    company: "Tech Solutions",
    location: "Quezon City, Philippines",
    postedAt: "2 hours ago",
  },
];

const Index = () => {
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const jobPosts = posts.filter((p) => p.type === "JOB");
  const feedPosts = posts.filter((p) => p.type === "POST");

  const scrollRail = (direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;
    const amount = rail.clientWidth * 0.9;
    rail.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  const handleCardKeyDown =
    (post: FeedPost) => (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setSelectedPost(post);
      }
    };

  return (
    <Page>
      <div className="mx-auto flex w-full min-h-dvh flex-col border-x border-dashed border-neutral-400 px-4 sm:max-w-[85rem] sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {/* LEFT */}
          <div className="flex flex-col gap-3 p-4 lg:sticky lg:top-0 lg:max-h-dvh lg:overflow-y-auto lg:border-r lg:border-dashed lg:border-neutral-300">
            <CardProfile />
            <CardAnalytics />
          </div>

          {/* FEED */}
          <div className="flex flex-col items-center gap-4 p-4 lg:col-span-2 lg:border-r lg:border-dashed lg:border-neutral-300">
            <CardWritePost />

            <hr className="w-full border-0 border-t border-dashed border-neutral-300" />

            {jobPosts.length > 0 && (
              <div className="w-full">
                <div className="mb-3 flex items-center justify-between px-1">
                  <h3 className="text-sm font-semibold text-neutral-700">Jobs for you</h3>

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
                  {jobPosts.map((post) => (
                    <div
                      key={post.id}
                      role="button"
                      tabIndex={0}
                      aria-haspopup="dialog"
                      onClick={() => setSelectedPost(post)}
                      onKeyDown={handleCardKeyDown(post)}
                      className="w-[85%] flex-shrink-0 cursor-pointer snap-start rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-[380px]"
                    >
                      <CardPost post={post}  />
                    </div>
                  ))}
                </div>

                <hr className="mt-1 w-full border-0 border-t border-dashed border-neutral-300" />
              </div>
            )}

            {feedPosts.length > 0 ? (
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
                  <CardPost post={post}  />
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No posts yet. Be the first to share something.
              </p>
            )}
          </div>

          {/* RIGHT */}
          <div className="p-4 lg:sticky lg:top-0 lg:max-h-dvh lg:overflow-y-auto">
            <CardConnectionRecommendation />
          </div>
        </div>
      </div>

      <Dialog
        open={selectedPost !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedPost(null);
        }}
      >
        <DialogContent className="flex max-h-[90vh] flex-col gap-4 overflow-y-auto sm:max-w-xl">
          {selectedPost?.type === "JOB" ? (
            <>
              <DialogHeader>
                <DialogTitle>Apply for {selectedPost.title}</DialogTitle>
                <DialogDescription>
                  Submit your application to {selectedPost.company}.
                </DialogDescription>
              </DialogHeader>

              {/* <ApplicationForm job={selectedPost} /> */}
            </>
          ) : selectedPost ? (
            <>
              <DialogHeader>
                <DialogTitle>Post Details</DialogTitle>
                <DialogDescription>
                  View the full post and interact with it.
                </DialogDescription>
              </DialogHeader>

              <CardPost post={selectedPost} />
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </Page>
  );
};

export default Index;