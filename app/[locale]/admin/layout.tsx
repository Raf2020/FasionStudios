import AdminHeader from "@/components/admin/global/admin-header";
import AdminRequired from "@/components/global/hoc-guard/admin-required";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <AdminRequired>
      <div className="w-full">
        <AdminHeader />
        <div className="w-full py-10 px-6 sm:px-15">{children}</div>
      </div>
    // </AdminRequired>
  );
}
