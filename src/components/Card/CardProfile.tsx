import { Avatar, AvatarImage } from "@/components/Avatar/Avatar";

import { Card, CardContent, CardHeader } from "@/components/Card/Card";
import { Globe} from "lucide-react";
import { Badge } from "@/components/Badge/Badge";

const CardProfile = () => {
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
};

export default CardProfile;
