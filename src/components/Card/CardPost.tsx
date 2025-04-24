import { Avatar, AvatarImage } from "@/components/Avatar/Avatar";

import { Card, CardContent, CardHeader } from "@/components/Card/Card";
import { Globe, Bookmark, Heart } from "lucide-react";
import { Badge } from "@/components/Badge/Badge";

const CardPost = () => {
  return (
    <Card className="sm:max-w-xl shadow-sm border border-neutral-200 rounded-2xl p-3">
      <CardHeader className="flex flex-row items-start p-4">
        <Avatar className="size-14">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div className="flex flex-row justify-between w-full">
          <div className="pl-4">
            <div className="font-semibold text-black text-lg">
              Adrian Vargas
              <span className="pl-2">
                <Badge variant="outline">Recruiter</Badge>
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Jr. Software Engineer
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <span>Posted 1hr ago</span>
              <span>·</span>
              <Globe className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <Heart className="size-5" />
            <Bookmark className="size-5" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 pt-2 space-y-3">
        <h3 className="text-lg font-semibold text-neutral-900">
          Looking for a Frontend Engineer for an E-commerce Dashboard
        </h3>
        <p className="text-sm text-neutral-700">
          I’m looking for a skilled frontend developer with experience in React
          and TailwindCSS to build components for a sales analytics dashboard.
          Project duration is 2-3 weeks. Budget is flexible.
        </p>
      </CardContent>

      {/* <CardFooter className="pb-2 justify-around px-10 pt-1">
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
            Apply
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
      </CardFooter> */}
    </Card>
  );
};

export default CardPost;
