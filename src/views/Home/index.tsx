import { Avatar, AvatarImage } from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/Card/Card";
import { Page } from "@/components/Pages";
import { Globe, Bookmark, Send, MessageSquare } from "lucide-react";
import { Badge } from "@/components/Badge/Badge";
import CardPost from "@/components/Card/CardPost";

const Index = () => {
  return (
    <Page>
      <div className="flex w-full min-h-[100dvh] justify-center sm:max-w-[85rem] border-x border-dashed border-neutral-400">
        <div className="flex flex-1 flex-col items-center w-full p-4 gap-4 max-w-3xl">
          <CardPost/>
          <CardPost/>
          <CardPost/>
        </div>
      </div>
    </Page>
  );
};

export default Index;
