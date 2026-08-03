import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import CreatePostForm from "@/modules/post/views/CreatePost";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";

export default function CardWritePost() {
  return (
    <Card className="w-full sm:max-w-xl rounded-2xl border border-neutral-200 p-3 shadow-sm">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="h-12 w-full justify-start rounded-full px-5 text-muted-foreground"
          >
            Start a post
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-xl">
          <DialogTitle>Create a post</DialogTitle>

          <DialogDescription>
            Share your thoughts, ideas, or updates.
          </DialogDescription>

          <div className="mt-4">
            <CreatePostForm />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}