import PageMain from "./PageMain";

export default function Page(props: any) {
  const { children } = props;
  return (
    <div className="min-h-[150vh] flex flex-col">
      <PageMain>{children}</PageMain>
    </div>
  );
}
