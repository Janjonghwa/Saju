import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { findUserRole } from "@/server/repositories/user-repository";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/start");
  }

  const userRole = await findUserRole(session.user.id);

  if (userRole !== "admin") {
    redirect("/start");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <header className="mb-6 rounded-xl border border-slate-700 bg-slate-900/60 p-4 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Admin</p>
              <h1 className="text-xl font-semibold text-white">관리자 대시보드</h1>
            </div>
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/admin"
                className="rounded-md border border-slate-600 px-3 py-1.5 text-slate-200 transition hover:border-amber-400 hover:text-amber-300"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/audit-trail"
                className="rounded-md border border-slate-600 px-3 py-1.5 text-slate-200 transition hover:border-amber-400 hover:text-amber-300"
              >
                Audit Trail
              </Link>
            </nav>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
