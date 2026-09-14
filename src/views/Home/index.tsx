"use client";

// import { useRef, useState, type KeyboardEvent } from "react";
import { Page } from "@/components/shared/Layout";
// import CardPost from "@/views/Home/sections/CardPost";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/Dialog";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import CardProfile from "./sections/CardProfile";
import CardConnectionRecommendation from "./sections/CardConnectionRecommendation";
import CardAnalytics from "./sections/CardAnalytics";
// import CardWritePost from "./sections/CardWritePost";
import CardFeed from "./sections/CardFeed";
// import ApplicationForm from "@/modules/application/views/ApplicantForm";

// type PostType = "JOB" | "POST";

// type FeedPost = {
//   id: number;
//   type: PostType;
//   title?: string;
//   company?: string;
//   location?: string;
//   postedAt: string;
// };

// const posts: FeedPost[] = [
//   {
//     id: 1,
//     type: "JOB",
//     title: "Frontend Developer",
//     company: "Camplyr Inc.",
//     location: "Manila, Philippines",
//     postedAt: "2 hours ago",
//   },
//   {
//     id: 2,
//     type: "POST",
//     postedAt: "2 hours ago",
//   },
//   {
//     id: 3,
//     type: "JOB",
//     title: "Backend Developer",
//     company: "Tech Solutions",
//     location: "Quezon City, Philippines",
//     postedAt: "2 hours ago",
//   },
// ];

const Index = () => {
  // const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);
  // const railRef = useRef<HTMLDivElement>(null);

  // const jobPosts = posts.filter((p) => p.type === "JOB");
  // const feedPosts = posts.filter((p) => p.type === "POST");

  // const scrollRail = (direction: "left" | "right") => {
  //   const rail = railRef.current;
  //   if (!rail) return;
  //   const amount = rail.clientWidth * 0.9;
  //   rail.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  // };

  // const handleCardKeyDown =
  //   (post: FeedPost) => (event: KeyboardEvent<HTMLDivElement>) => {
  //     if (event.key === "Enter" || event.key === " ") {
  //       event.preventDefault();
  //       setSelectedPost(post);
  //     }
  //   };

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
          <CardFeed/>

          {/* RIGHT */}
          <div className="p-4 lg:sticky lg:top-0 lg:max-h-dvh lg:overflow-y-auto">
            <CardConnectionRecommendation />
          </div>
        </div>
      </div>

    </Page>
  );
};

export default Index;