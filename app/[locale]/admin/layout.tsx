import AdminHeader from "@/components/admin/global/admin-header";
import AdminRequired from "@/components/global/hoc-guard/admin-required";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRequired>
      <div className="w-full">
        <AdminHeader />
        <div className="mx-auto w-full min-w-0 max-w-screen-2xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">{children}</div>
      </div>
    </AdminRequired>
  );
}
