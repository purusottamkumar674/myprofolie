import { redirect } from "next/navigation";
import { AdminLogin } from "@/components/admin/admin-login";
import { isCurrentUserAdmin } from "@/lib/data/portfolio";

export const metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  const auth = await isCurrentUserAdmin();
  if (auth.isAdmin) redirect("/admin");
  return <AdminLogin demoAllowed={process.env.NODE_ENV === "development"} />;
}
