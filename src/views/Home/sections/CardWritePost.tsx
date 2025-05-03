import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Send, Bookmark, MessageSquare } from "lucide-react";

export default function CardWritePost() {
  return (
    <Card className="sm:max-w-xl shadow-sm border border-neutral-200 rounded-2xl p-3">
      <CardContent className="w-full px-4 pb-4 pt-2 space-y-3">
        <div className="flex flex-row items-center gap-3">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <Input
            type="email"
            placeholder="Write something..."
            className="rounded-2xl h-12"
          />
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
            size="sm"
            className="flex-1 flex items-center gap-1 text-sm bg-primary text-white hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
            Post
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
    </Card>
  );
}
