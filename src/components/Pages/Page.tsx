import PrivateNav from "../Navigation/PrivateNav";
import PageMain from "./PageMain";

export default function Page(props: any) {
  const { children } = props;
  return (
    <div className="min-h-[150vh] flex flex-col">
      <PrivateNav/>
      <PageMain>{children}</PageMain>
    </div>
  );
}
