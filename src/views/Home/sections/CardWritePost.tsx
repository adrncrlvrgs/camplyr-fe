import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function CardWritePost() {
  return (
    <Card className="sm:max-w-xl shadow-sm border border-neutral-200 rounded-2xl p-3">
      <CardContent className="px-4 pb-4 pt-2 space-y-3">
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

        <h3 className="text-lg font-semibold text-neutral-900">
          Looking for a Frontend Engineer for an E-commerce Dashboard
        </h3>
        <p className="text-sm text-neutral-700">
          I’m looking for a skilled frontend developer with experience in React
        </p>
      </CardContent>
    </Card>
  );
}
