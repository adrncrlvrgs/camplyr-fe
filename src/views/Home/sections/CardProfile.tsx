import { Avatar, AvatarImage } from "@/components/ui/Avatar";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const CardProfile = () => {
  return (
    <Card className="sm:max-w-xl shadow-sm border border-neutral-200 rounded-2xl p-3">
      <CardHeader className="flex flex-row items-start p-4">
        <Avatar className="size-18">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div className="flex flex-col justify-between w-full">
          <div className="pl-4">
            <div className="font-semibold text-black text-lg">
              Adrian Vargas
            </div>
            <p className="text-xs text-muted-foreground">
              Jr. Software Engineer
            </p>
            <span>
              <Badge variant="outline">Seeker</Badge>
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 space-y-3 pb-2 pt-0">
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          <MapPin className="w-3.5 h-3.5" />
          <span> Metro Manila, Philippines</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProfile;
