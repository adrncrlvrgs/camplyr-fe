import { useState } from "react";
import { Page } from "@/components/shared/Layout";
import CardPost from "@/views/Home/sections/CardPost";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import CardProfile from "./sections/CardProfile";
import CardConnectionRecommendation from "./sections/CardConnectionRecommendation";
import CardAnalytics from "./sections/CardAnalytics";
import CardWritePost from "./sections/CardWritePost";
import ApplicationForm from "@/modules/application/views/ApplicantForm";

type PostType = "JOB" | "POST";

type FeedPost = {
  id: number;
  type: PostType;
  title?: string;
  company?: string;
  location?: string;
};

const posts: FeedPost[] = [
  {
    id: 1,
    type: "JOB",
    title: "Frontend Developer",
    company: "Camplyr Inc.",
    location: "Manila, Philippines",
  },
  {
    id: 2,
    type: "POST",
  },
  {
    id: 3,
    type: "JOB",
    title: "Backend Developer",
    company: "Tech Solutions",
    location: "Quezon City, Philippines",
  },
];

const Index = () => {
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);

  const jobPosts = posts.filter((p) => p.type === "JOB");
  const feedPosts = posts.filter((p) => p.type === "POST");

  const renderDialog = (post: FeedPost) => (
    <Dialog
      key={post.id}
      onOpenChange={(open) => {
        if (!open) setSelectedPost(null);
      }}
    >
      <DialogTrigger asChild>
        <div onClick={() => setSelectedPost(post)} className="cursor-pointer">
          <CardPost type={post.type} />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto flex flex-col items-center justify-center">
        {selectedPost?.type === "JOB" ? (
          <>
            <DialogHeader>
              <DialogTitle>Apply for {selectedPost.title}</DialogTitle>
              <DialogDescription>
                Submit your application to {selectedPost.company}.
                applicatiom form here
                <ApplicationForm post={selectedPost}/>
              </DialogDescription>
            </DialogHeader>
            {/* <ApplicationForm post={selectedPost} /> */}
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Post Details</DialogTitle>
              <DialogDescription>
                View the full post and interact with it.
              </DialogDescription>
            </DialogHeader>
            <CardPost type="POST" />
          </>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <Page>
      <div className="flex flex-col w-full min-h-dvh justify-center sm:max-w-[85rem] border-x border-dashed border-neutral-400 px-10">
        <div className="grid grid-cols-4 w-full mx-auto">
          {/* LEFT */}
          <div className="flex flex-col p-4 gap-3">
            <CardProfile />
            <CardAnalytics />
          </div>

          {/* FEED */}
          <div className="col-span-2 col-start-2 w-full">
            <div className="flex flex-1 flex-col items-center p-4 gap-4">
              <CardWritePost />

              <div className="w-full px-4">
                <hr className="border-dashed border-b border-neutral-400 w-full" />
              </div>

              {/* Horizontal job rail */}
              {jobPosts.length > 0 && (
                <div className="w-full">
                  <h3 className="text-sm font-semibold text-neutral-700 px-1 mb-3">
                    Jobs for you
                  </h3>

                  <div
                    className="flex gap-4 overflow-x-auto pb-3 px-1 no-scrollbar snap-x snap-mandatory"
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
                        className="flex-shrink-0 w-[85%] sm:w-[380px] snap-start"
                      >
                        {renderDialog(post)}
                      </div>
                    ))}
                  </div>

                  <div className="w-full px-4 mt-1">
                    <hr className="border-dashed border-b border-neutral-400 w-full" />
                  </div>
                </div>
              )}

              {/* Vertical feed - posts only */}
              {feedPosts.map((post) => (
                <div key={post.id} className="w-full">
                  {renderDialog(post)}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-4">
            <CardConnectionRecommendation />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Index;