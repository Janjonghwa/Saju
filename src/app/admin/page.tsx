import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { findUserRole } from "@/server/repositories/user-repository";

const formatDateTime = (dateLike: Date | string) => {
  const date = dateLike instanceof Date ? dateLike : new Date(dateLike);

  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(date);
};

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/start");
  }

  const userRole = await findUserRole(session.user.id);

  if (userRole !== "admin") {
    redirect("/start");
  }

  const [totalUsers, totalReports, recentReportLogs] = await Promise.all([
    prisma.user.count(),
    prisma.report.count(),
    prisma.reportLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        report: {
          select: {
            id: true,
            theme: true,
            summary: true,
            userId: true,
          },
        },
      },
    }),
  ]);

  return (
    <main className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl border border-slate-700 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">전체 사용자</p>
          <p className="mt-2 text-3xl font-bold text-white">{totalUsers.toLocaleString("ko-KR")}</p>
        </article>
        <article className="rounded-xl border border-slate-700 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">전체 리포트</p>
          <p className="mt-2 text-3xl font-bold text-white">{totalReports.toLocaleString("ko-KR")}</p>
        </article>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900/60 p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-white">최근 리포트 로그 (최대 20건)</h2>
          <span className="text-xs text-slate-400">{recentReportLogs.length}건 표시</span>
        </div>

        {recentReportLogs.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-400">
            아직 생성된 리포트 로그가 없습니다.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="px-3 py-2 font-medium">생성일</th>
                  <th className="px-3 py-2 font-medium">로그 ID</th>
                  <th className="px-3 py-2 font-medium">리포트 ID</th>
                  <th className="px-3 py-2 font-medium">사용자 ID</th>
                  <th className="px-3 py-2 font-medium">테마</th>
                  <th className="px-3 py-2 font-medium">요약</th>
                </tr>
              </thead>
              <tbody>
                {recentReportLogs.map((log) => (
                  <tr key={log.id} className="border-b border-slate-800 align-top text-slate-200">
                    <td className="whitespace-nowrap px-3 py-2">{formatDateTime(log.createdAt)}</td>
                    <td className="px-3 py-2 font-mono text-xs">{log.id}</td>
                    <td className="px-3 py-2 font-mono text-xs">{log.reportId}</td>
                    <td className="px-3 py-2 font-mono text-xs">{log.report.userId}</td>
                    <td className="px-3 py-2 uppercase">{log.report.theme}</td>
                    <td className="max-w-[420px] px-3 py-2 text-slate-300">{log.report.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
