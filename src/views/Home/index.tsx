import { Page } from "@/components/Pages";
import CardPost from "@/components/Card/CardPost";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/Modal/Dialog";
import CardProfile from "@/components/Card/CardProfile";

const Index = () => {
  return (
    <Page>
      <div className="flex flex-col w-full min-h-[100dvh] justify-center sm:max-w-[85rem] border-x border-dashed border-neutral-400">
        <div className=" grid grid-cols-4 w-full gap-3">
          <div>
            <CardProfile/>
          </div>
          <div className="col-span-2 col-start-2 w-full">
            <div className="flex flex-1 flex-col items-center p-4 gap-4 ">
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
          <div>
            <CardPost />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Index;
