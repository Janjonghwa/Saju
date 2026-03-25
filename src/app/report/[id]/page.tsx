import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { findReportById } from "@/server/repositories/report-repository";
import type { ThemeReport } from "@/types/report";

import { ReportPrintButton } from "./print-button";

type ReportPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const formatDateTime = (dateLike: Date | string) => {
  const date = dateLike instanceof Date ? dateLike : new Date(dateLike);

  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(date);
};

export default async function ReportPage({ params }: ReportPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/start");
  }

  const { id } = await params;
  const report = await findReportById(id);

  if (!report || report.userId !== session.user.id) {
    notFound();
  }

  const reportResult = report.result as ThemeReport;

  return (
    <main className="report-page mx-auto min-h-screen w-full max-w-4xl bg-white px-6 py-8 text-zinc-900">
      <style>{`
        @media print {
          html, body {
            background: #fff;
          }

          .report-page {
            max-width: none;
            margin: 0;
            padding: 0;
          }
        }
      `}</style>

      <header className="mb-6 border-b border-zinc-200 pb-4">
        <div className="mb-4 flex items-center justify-between gap-3 print:hidden">
          <Link href="/start" className="text-sm text-zinc-600 underline">
            ← 시작 페이지로
          </Link>
          <ReportPrintButton />
        </div>

        <h1 className="text-3xl font-bold">사주 리포트</h1>
        <p className="mt-2 text-sm text-zinc-600">{report.summary}</p>
      </header>

      <section className="grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-md border border-zinc-200 p-3">
          <p className="text-zinc-500">리포트 ID</p>
          <p className="mt-1 font-medium break-all">{report.id}</p>
        </div>
        <div className="rounded-md border border-zinc-200 p-3">
          <p className="text-zinc-500">생성일</p>
          <p className="mt-1 font-medium">{formatDateTime(report.createdAt)}</p>
        </div>
        <div className="rounded-md border border-zinc-200 p-3">
          <p className="text-zinc-500">테마</p>
          <p className="mt-1 font-medium">{reportResult.theme}</p>
        </div>
        <div className="rounded-md border border-zinc-200 p-3">
          <p className="text-zinc-500">점수</p>
          <p className="mt-1 font-medium">{reportResult.score ?? "-"}</p>
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">리포트 본문</h2>
        {reportResult.sections.map((section, index) => (
          <article key={`${section.title}-${index}`} className="rounded-md border border-zinc-200 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold">{section.title}</h3>
              <span className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
                {section.accessLevel}
              </span>
            </div>
            <p className="whitespace-pre-wrap leading-7 text-zinc-800">{section.content}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
