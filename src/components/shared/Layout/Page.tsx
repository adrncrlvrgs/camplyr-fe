import type { ReactNode } from "react";
import PrivateNav from "../Navigation/PrivateNav";
import PageMain from "./PageMain";

export default function Page({ children }: { children: ReactNode }) {

  return (
    <div className="min-h-[150vh] flex flex-col">
      <PrivateNav />
      <PageMain>{children}</PageMain>
    </div>
  );
}
