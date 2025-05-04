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
import CardConnectionRecomendation from "./sections/CardConnectionRecomendation";
import CardAnalytics from "./sections/CardAnalytics";
import CardWritePost from "./sections/CardWritePost";

const Index = () => {
  return (
    <Page>
      <div className="flex flex-col w-full min-h-dvh justify-center sm:max-w-[85rem] border-x border-dashed border-neutral-400 px-10">
        <div className=" grid grid-cols-4 w-full mx-auto">
          <div className=" flex flex-col p-4 gap-3">
            <CardProfile />
            <CardAnalytics />
          </div>
          <div className="col-span-2 col-start-2 w-full">
            <div className="flex flex-1 flex-col items-center p-4 gap-4 ">
              <CardWritePost />
              <div className=" w-full px-4">
                <hr className="border-dashed border-b border-neutral-400 w-full " />
              </div>

              {[1, 2, 3].map((_, key) => (
                <Dialog key={key}>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer w-auto">
                      <CardPost />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                      <DialogTitle>Job Details</DialogTitle>
                      <DialogDescription>
                        Here's the full description and actions for the post.
                      </DialogDescription>
                    </DialogHeader>
                    <p>test</p>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
          <div className="p-4">
            <CardConnectionRecomendation />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Index;
