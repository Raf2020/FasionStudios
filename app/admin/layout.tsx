export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full pt-28 px-15">{children}</div>;
}
