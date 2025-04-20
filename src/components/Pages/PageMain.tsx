export default function PageMain(props: any) {
  const { children } = props;
  return (
    <main className="flex flex-1 flex-col overflow-y-auto items-center">{children}</main>
  );
}
