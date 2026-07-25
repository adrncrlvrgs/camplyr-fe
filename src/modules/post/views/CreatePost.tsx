import { CustomForm } from "@/components/ui/CustomFrom";
import { CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { postSchema } from "@/utils/validation/validation.schema";
import { Send, Bookmark, MessageSquare } from "lucide-react";
import { FormError } from "@/components/ui/FormError";
import { useAddPost } from "../hooks/useAddPost";

export default function CreatePostForm() {
  const { createPost, isSubmitting, serverError } = useAddPost();
  return (
    <CustomForm schema={postSchema} onSubmit={createPost} resetOnSuccess>
      {({ errors }) => (
        <>
          <CardContent className="w-full px-4 pb-4 pt-2 space-y-3">
            <div className="flex flex-row items-center gap-3">
              <Avatar className="size-14">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <textarea
                name="content"
                placeholder="Write something..."
                className="rounded-2xl h-12"
              />
              <FormError message={errors.content} />

              <FormError message={serverError?.message} />
            </div>
          </CardContent>
          <CardFooter className="pb-2 justify-around px-10 pt-1">
            <div className="flex w-full gap-x-20">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 flex items-center gap-1 text-sm text-muted-foreground hover:text-black"
              >
                <Bookmark className="w-4 h-4" />
                Save
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                size="sm"
                className="flex-1 flex items-center gap-1 text-sm bg-primary text-white hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Posting..." : "Create Post"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 flex items-center gap-1 text-sm text-muted-foreground hover:text-black"
              >
                <MessageSquare className="w-4 h-4" />
                Message
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </CustomForm>
  );
}
