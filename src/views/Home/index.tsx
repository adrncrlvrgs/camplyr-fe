import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/Card/Card";
import PrivateNav from "@/components/Navigation/PrivateNav";
import { Page } from "@/components/Pages";
import React from "react";
import { Globe } from "lucide-react"; // Assuming you're using lucide-react

const Index = () => {
  return (
    <Page>
      <div className="flex w-full min-h-[100dvh] justify-center sm:max-w-[85rem] border-x border-dashed border-neutral-400">
        <div className="flex flex-1 flex-col items-center w-full p-4 gap-4 max-w-3xl">
          {/* Feed Card */}
          <Card className="w-full shadow-sm border border-neutral-200 rounded-2xl">
            <CardHeader className="flex flex-row items-start p-4">
              <Avatar className="size-14">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="pl-4">
                <div className="font-semibold text-black text-lg">
                  Adrian Vargas
                </div>
                <p className="text-sm text-muted-foreground">
                  Jr. Software Engineer
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <span>Posted 1hr ago</span>
                  <span>·</span>
                  <Globe className="w-3.5 h-3.5" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-4 pb-4 pt-2 space-y-3">
              <h3 className="text-lg font-semibold text-neutral-900">
                Looking for a Frontend Engineer for an E-commerce Dashboard
              </h3>
              <p className="text-sm text-neutral-700">
                I’m looking for a skilled frontend developer with experience in
                React and TailwindCSS to build components for a sales analytics
                dashboard. Project duration is 2-3 weeks. Budget is flexible.
              </p>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  Save
                </Button>
                <Button size="sm">Apply</Button>
                <Button variant="ghost" size="sm">
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default Index;
