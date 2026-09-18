import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { fallbackData } from "@/lib/data/fallback";
import { getPortfolioData, isCurrentUserAdmin } from "@/lib/data/portfolio";

export const metadata = { title: "Portfolio Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ demo?: string }> }) {
  const params = await searchParams;
  const demo = process.env.NODE_ENV === "development" && params.demo === "1";
  if (demo) return <AdminDashboard initialData={fallbackData} demo userEmail="Local preview" />;

  const auth = await isCurrentUserAdmin();
  if (!auth.configured || !auth.user) redirect("/admin/login");
  if (!auth.isAdmin) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#09090d] p-6 text-center text-white">
        <div className="max-w-lg rounded-[2rem] border border-rose-400/20 bg-rose-400/[0.06] p-8">
          <h1 className="text-2xl font-semibold">Admin access required</h1>
          <p className="mt-3 text-sm leading-6 text-white/50">This account is authenticated but is not present in the admins table. Run the included create-admin script with this email.</p>
          <form action="/admin/logout" method="post"><button className="secondary-button mt-6" type="submit">Sign out</button></form>
        </div>
      </main>
    );
  }

  const data = await getPortfolioData();
  return <AdminDashboard initialData={data} demo={false} userEmail={auth.user.email || "Administrator"} />;
}
