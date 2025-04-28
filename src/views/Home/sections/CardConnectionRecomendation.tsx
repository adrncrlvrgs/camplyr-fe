import { Avatar, AvatarImage } from "@/components/ui/Avatar";

import { Card } from "@/components/ui/Card";

import { Badge } from "@/components/ui/Badge";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";


const RecommendationUser = (key: any) => {
  return (
    <div className=" flex flex-1 flex-col" key={key}>
      <div className="flex flex-row items-start p-4 pb-0">
        <Avatar className="size-12">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div className="flex flex-col justify-between w-full">
          <div className="pl-4">
            <div className="font-semibold text-black text-sm">
              Adrian Vargas
            </div>
            <p className="text-xs text-muted-foreground">
              Jr. Software Engineer
            </p>
          </div>
        </div>
        <span>
          <Badge variant="outline">Seeker</Badge>
        </span>
      </div>
      <div className="self-center mt-1">
        <Button variant={'outline'}  className="border-1 border-black rounded-3xl shadow-none">
          <Plus className="w-5 h-5" />
          <span>Connect</span>
        </Button>
      </div>
    </div>
  );
};

const CardConnectionRecomendation = () => {
  return (
    <Card className="sm:max-w-xl shadow-sm border border-neutral-200 rounded-2xl p-3">
      {[1, 2, 3].map((_, key) => (
        <RecommendationUser key={key} />
      ))}
    </Card>
  );
};

export default CardConnectionRecomendation;
