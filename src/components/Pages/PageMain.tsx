export default function PageMain(props: any) {
  const { children } = props;
  return <main className="flex-1 overflow-y-auto">{children}</main>;
}
