import { Card, CardContent } from "@/components/ui/Card";

export default function CardAnalytics() {
  return (
    <Card className="py-3 rounded-2xl">
      <CardContent className="flex flex-col pb-0 gap-2">
        <div className="flex flex-row justify-between ">
          <span className=" text-xs font-medium">Profile Viewers</span>
          <span className="text-xs font-medium">26</span>
        </div>
        <div>
          <span className="text-xs font-medium">View Analytics</span>
        </div>
      </CardContent>
    </Card>
  );
}
