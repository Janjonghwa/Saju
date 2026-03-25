import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "사주 리포트 - 정확한 사주팔자 해석",
  description: "AI 기반 사주팔자 해석 서비스. 오늘운세, 올해운세, 배우자운, 취업운 리포트를 제공합니다.",
  openGraph: {
    title: "사주 리포트 - 정확한 사주팔자 해석",
    description: "AI 기반 사주팔자 해석 서비스. 오늘운세, 올해운세, 배우자운, 취업운 리포트를 제공합니다.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero */}
      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
        <span className="mb-4 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
          AI 기반 사주 분석
        </span>
        <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
          당신의 사주,
          <br />
          정확하게 해석합니다
        </h1>
        <p className="mb-8 max-w-lg text-lg text-slate-300">
          생년월일과 출생시간을 입력하면 오행 분석, 오늘의 운세, 올해의 운세, 배우자운, 취업운까지 한 번에 확인할 수 있습니다.
        </p>
        <Link
          href="/start"
          className="rounded-lg bg-amber-500 px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400"
        >
          무료로 시작하기
        </Link>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">리포트 종류</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "기본 사주", desc: "오행 균형과 성격 분석", icon: "☯" },
            { title: "오늘의 운세", desc: "하루 단위 운세 흐름", icon: "📅" },
            { title: "올해의 운세", desc: "연간 운세 종합 분석", icon: "🎯" },
            { title: "배우자 · 취업운", desc: "인연과 직업 적성", icon: "💎" },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
              <span className="mb-2 block text-2xl">{f.icon}</span>
              <h3 className="mb-1 font-semibold text-white">{f.title}</h3>
              <p className="text-sm text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">이용 방법</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { step: "1", title: "정보 입력", desc: "생년월일과 출생시간을 입력하세요" },
            { step: "2", title: "AI 분석", desc: "사주팔자를 계산하고 오행을 분석합니다" },
            { step: "3", title: "리포트 확인", desc: "맞춤 해석 리포트를 바로 확인하세요" },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-slate-900">
                {s.step}
              </span>
              <h3 className="mb-1 font-semibold text-white">{s.title}</h3>
              <p className="text-sm text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">지금 바로 시작하세요</h2>
        <p className="mb-6 text-slate-400">무료로 기본 사주 리포트를 받아보세요.</p>
        <Link
          href="/start"
          className="rounded-lg bg-amber-500 px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400"
        >
          시작하기
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        © 2026 사주 리포트. All rights reserved.
      </footer>
    </main>
  );
}
