import { auth, signIn, signOut } from "@/auth";
import { StartClientForm } from "@/app/start/start-client-form";
import Link from "next/link";

const isGoogleOAuthReady =
  Boolean(process.env.AUTH_GOOGLE_ID) && Boolean(process.env.AUTH_GOOGLE_SECRET);
const isKakaoOAuthReady =
  Boolean(process.env.AUTH_KAKAO_ID) && Boolean(process.env.AUTH_KAKAO_SECRET);
const isNaverOAuthReady =
  Boolean(process.env.AUTH_NAVER_ID) && Boolean(process.env.AUTH_NAVER_SECRET);

const socialLoginProviders = [
  {
    id: "google",
    label: "Google 로그인",
    className: "w-full rounded-lg bg-white/90 px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-white",
    enabled: isGoogleOAuthReady,
  },
  {
    id: "kakao",
    label: "카카오 로그인",
    className: "w-full rounded-lg bg-[#FEE500] px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-[#fdd835]",
    enabled: isKakaoOAuthReady,
  },
  {
    id: "naver",
    label: "네이버 로그인",
    className: "w-full rounded-lg bg-[#03C75A] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#02b350]",
    enabled: isNaverOAuthReady,
  },
] as const;

const enabledSocialLoginProviders = socialLoginProviders.filter(
  (provider) => provider.enabled,
);

export default async function StartPage() {
  const session = await auth();

  return (
    <main className="relative min-h-screen overflow-hidden bg-traditional">
      {/* Header */}
      <header className="relative z-10 border-b border-amber-900/20">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-['Noto_Serif_KR'] text-lg font-bold text-gold-gradient">
            命理
          </Link>
          {session?.user && (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="rounded px-3 py-1.5 text-xs text-slate-500 transition hover:text-amber-400"
              >
                로그아웃
              </button>
            </form>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 py-12">
        {session?.user ? (
          <div className="space-y-6">
            {/* User info */}
            <div className="text-center">
              <p className="font-['Noto_Serif_KR'] text-sm text-amber-200/60">
                {session.user.email ?? session.user.name}님
              </p>
              <h1 className="mt-2 font-['Noto_Serif_KR'] text-2xl font-bold text-white">
                사주 리포트
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                정보를 입력하고 리포트를 생성하세요
              </p>
            </div>
            <StartClientForm />
          </div>
        ) : (
          <div className="flex flex-col items-center py-16">
            <span className="mb-6 font-['Noto_Serif_KR'] text-sm tracking-[0.3em] text-gold-gradient">
              전통 사주명리학
            </span>
            <h1 className="mb-2 font-['Noto_Serif_KR'] text-2xl font-bold text-white">
              로그인
            </h1>
            <p className="mb-8 text-sm text-slate-500">
              소셜 로그인 후 사주 리포트를 생성하세요
            </p>

            {enabledSocialLoginProviders.length > 0 ? (
              <div className="w-full max-w-xs space-y-3">
                {enabledSocialLoginProviders.map((provider) => (
                  <form
                    key={provider.id}
                    action={async () => {
                      "use server";
                      await signIn(provider.id, { redirectTo: "/start" });
                    }}
                  >
                    <button type="submit" className={provider.className}>
                      {provider.label}
                    </button>
                  </form>
                ))}
                
                {/* Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-amber-900/20"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e] px-2 text-slate-600">또는</span>
                  </div>
                </div>
                
                {/* Guest login */}
                <form
                  action={async () => {
                    "use server";
                    await signIn("guest", { redirectTo: "/start" });
                  }}
                >
                  <button
                    type="submit"
                    className="w-full rounded-lg border border-amber-900/30 bg-transparent px-4 py-3 text-sm font-medium text-amber-400 transition hover:border-amber-700/50 hover:bg-amber-900/10"
                  >
                    게스트로 시작하기
                  </button>
                </form>
              </div>
            ) : (
              <div className="w-full max-w-xs space-y-3">
                <div className="card-traditional rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-400">소셜 로그인을 설정 중입니다</p>
                </div>
                
                {/* Guest login when no social providers */}
                <form
                  action={async () => {
                    "use server";
                    await signIn("guest", { redirectTo: "/start" });
                  }}
                >
                  <button
                    type="submit"
                    className="w-full rounded-lg border border-amber-900/30 bg-transparent px-4 py-3 text-sm font-medium text-amber-400 transition hover:border-amber-700/50 hover:bg-amber-900/10"
                  >
                    게스트로 시작하기
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
