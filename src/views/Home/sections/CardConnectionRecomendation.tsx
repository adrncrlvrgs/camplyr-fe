import { Avatar, AvatarImage } from "@/components/ui/Avatar";

import { Card } from "@/components/ui/Card";

import { Badge } from "@/components/ui/Badge";

const CardConnectionRecomendation = () => {
  return (
    <Card className="sm:max-w-xl shadow-sm border border-neutral-200 rounded-2xl p-3">
      <div className="flex flex-row items-start p-4">
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
      <div className="flex flex-row items-start p-4">
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
      <div className="flex flex-row items-start p-4">
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
    </Card>
  );
};

export default CardConnectionRecomendation;
