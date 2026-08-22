import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Globe, Bookmark, Heart } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

type CardPostProps = {
  type?: "JOB" | "POST";
};

const CardPost = ({ type = "POST" }: CardPostProps) => {
  const isJob = type === "JOB";

  const cardContent = (
    <Card
      className={`

        shadow-sm
        rounded-2xl
        p-3
        border
        ${isJob ? "border-transparent" : "border-neutral-200"}
        ${isJob ? "bg-background" : ""}
      `}
    >
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
    </Card>
  );

  if (!isJob) {
    return cardContent;
  }

  return (
    <div className="relative sm:max-w-xl rounded-2xl p-[3px] overflow-hidden">
      <div
        className="
      absolute inset-[-100%]
      bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_10%,#6366f1_25%,#06b6d4_40%,transparent_55%,transparent_100%)]
      animate-[spin_3s_linear_infinite]
      blur-[2px]
    "
      />

      <div className="relative rounded-[calc(1rem-1.5px)] bg-background">
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-500/40 blur-2xl rounded-full animate-pulse pointer-events-none" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-400/40 blur-2xl rounded-full animate-pulse [animation-delay:1.5s] pointer-events-none" />
          {cardContent}
        </div>
      </div>
    </div>
  );
};

export default CardPost;
