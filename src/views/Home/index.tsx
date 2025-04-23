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

const Index = () => {
  return (
    <Page>
      <div className="flex w-full min-h-[100dvh] justify-center sm:max-w-[85rem] border-x border-dashed border-neutral-400">
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
    </Page>
  );
};

export default Index;
