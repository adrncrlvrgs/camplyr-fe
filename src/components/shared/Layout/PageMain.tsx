
import type { ReactNode } from "react";
export default function PageMain({ children }: { children?: ReactNode }) {

  return (
    <main className="flex flex-1 flex-col overflow-y-auto items-center bg-[#FAF9F6]">{children}</main>
  );
}
