import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-traditional">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full border border-amber-900/10 float" />
        <div className="absolute right-20 top-40 h-48 w-48 rounded-full border border-amber-900/10 float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-1/4 h-32 w-32 rounded-full border border-amber-900/10 float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center">
        <span className="mb-6 font-['Noto_Serif_KR'] text-sm tracking-[0.3em] text-gold-gradient">
          전통 사주명리학
        </span>
        <h1 className="mb-6 font-['Noto_Serif_KR'] text-4xl font-bold leading-tight text-white md:text-6xl">
          <span className="gold-shimmer">命理</span>
          <span className="mx-2 text-amber-900/50">·</span>
          <span className="text-gold-gradient">사주팔자</span>
        </h1>
        <p className="mb-4 font-['Noto_Serif_KR'] text-xl text-amber-200/80">
          태어난 순간의 기운이 운명을 만듭니다
        </p>
        <p className="mb-10 max-w-lg text-base leading-relaxed text-slate-400">
          생년월일시를 바탕으로 오행의 균형을 분석하고,
          당신만의 사주 리포트를 제공합니다.
        </p>
        <Link
          href="/start"
          className="btn-traditional rounded-lg px-10 py-4 text-base font-semibold tracking-wide text-amber-100"
        >
          무료 사주 보기
        </Link>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-2xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />
      </div>

      {/* Services Section */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-24">
        <h2 className="mb-2 text-center font-['Noto_Serif_KR'] text-2xl font-bold text-white">
          제공 서비스
        </h2>
        <p className="mb-12 text-center text-sm text-slate-500">五 가지 테마로 운명을 읽습니다</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { title: "기본 사주", desc: "오행 분석과 성격", icon: "☯" },
            { title: "오늘의 운세", desc: "하루의 흐름", icon: "日" },
            { title: "올해의 운세", desc: "연간 종합 분석", icon: "年" },
            { title: "배우자운", desc: "인연과 궁합", icon: "緣" },
            { title: "취업운", desc: "직업과 적성", icon: "業" },
          ].map((f) => (
            <div key={f.title} className="card-traditional rounded-xl p-5 text-center">
              <span className="mb-3 block font-['Noto_Serif_KR'] text-3xl text-amber-500/80">{f.icon}</span>
              <h3 className="mb-1 font-semibold text-amber-100">{f.title}</h3>
              <p className="text-xs text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        <h2 className="mb-10 text-center font-['Noto_Serif_KR'] text-2xl font-bold text-white">
          이용 방법
        </h2>
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          {[
            { step: "一", title: "정보 입력", desc: "생년월일과 출생시간" },
            { step: "二", title: "사주 분석", desc: "오행 균형과 해석" },
            { step: "三", title: "리포트 확인", desc: "맞춤 운세 리포트" },
          ].map((s, i) => (
            <div key={s.step} className="flex flex-col items-center text-center">
              <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-amber-800/30 font-['Noto_Serif_KR'] text-xl text-amber-500">
                {s.step}
              </span>
              <h3 className="mb-1 font-semibold text-amber-100">{s.title}</h3>
              <p className="text-xs text-slate-500">{s.desc}</p>
              {i < 2 && (
                <div className="mt-4 hidden h-px w-16 bg-amber-800/20 sm:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="card-traditional rounded-2xl p-10">
          <h2 className="mb-3 font-['Noto_Serif_KR'] text-2xl font-bold text-white">
            지금 바로 시작하세요
          </h2>
          <p className="mb-6 text-sm text-slate-400">
            무료로 기본 사주 리포트를 받아보세요
          </p>
          <Link
            href="/start"
            className="btn-traditional rounded-lg px-8 py-3 text-sm font-semibold text-amber-100"
          >
            무료 사주 보기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-900/20 py-8 text-center">
        <p className="font-['Noto_Serif_KR'] text-xs text-slate-600">
          命理 · 사주 리포트
        </p>
        <p className="mt-1 text-xs text-slate-700">
          © 2026 사주 리포트
        </p>
      </footer>
    </main>
  );
}
