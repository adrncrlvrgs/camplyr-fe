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

const Index = () => {
  return (
    <Page>
      <div className="flex w-full h-[100dvh] justify-center sm:max-w-[85rem] border-dashed border-x border-neutral-500">
        <div className="flex flex-1 flex-col items-center w-full p-3">
          <Card className="w-lvh">
            <CardHeader className="flex flex-row">
              <Avatar className="size-15">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardDescription className="pl-3">
                <div className="font-bold text-black">Adrian Vargas</div>
                <p className="text-sm">Jr. Software Engineer</p>
                <p className="text-sm">1hr</p>
              </CardDescription>
            </CardHeader>
            <CardContent>LF Engineer</CardContent>
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default Index;
