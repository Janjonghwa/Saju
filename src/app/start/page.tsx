import { StartClientForm } from "@/app/start/start-client-form";
import Link from "next/link";

export default function StartPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-traditional">
      {/* Header */}
      <header className="relative z-10 border-b border-amber-900/20">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-['Noto_Serif_KR'] text-lg font-bold text-gold-gradient">
            命理
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 py-12">
        <div className="space-y-6">
          <div className="text-center">
            <span className="font-['Noto_Serif_KR'] text-sm tracking-[0.3em] text-gold-gradient">
              전통 사주명리학
            </span>
            <h1 className="mt-2 font-['Noto_Serif_KR'] text-2xl font-bold text-white">
              사주 리포트
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              정보를 입력하고 리포트를 생성하세요
            </p>
          </div>
          <StartClientForm />
        </div>
      </div>
    </main>
  );
}
