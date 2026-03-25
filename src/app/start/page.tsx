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
    className: "w-full rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100",
    enabled: isGoogleOAuthReady,
  },
  {
    id: "kakao",
    label: "Kakao 로그인",
    className: "w-full rounded-lg bg-[#FEE500] px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-[#fdd835]",
    enabled: isKakaoOAuthReady,
  },
  {
    id: "naver",
    label: "Naver 로그인",
    className: "w-full rounded-lg bg-[#03C75A] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#02b350]",
    enabled: isNaverOAuthReady,
  },
] as const;

const enabledSocialLoginProviders = socialLoginProviders.filter(
  (provider) => provider.enabled,
);

export default async function StartPage() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto w-full max-w-3xl px-6 py-10">
        <Link href="/" className="mb-6 inline-block text-sm text-slate-400 transition hover:text-amber-400">
          ← 홈으로
        </Link>

        <h1 className="mb-2 text-2xl font-bold text-white">사주 시작하기</h1>
        <p className="mb-6 text-sm text-slate-400">
          로그인 후 원하는 리포트를 생성하세요.
        </p>

        {session?.user ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3">
              <p className="text-sm text-slate-300">
                {session.user.email ?? session.user.name}님
              </p>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-400 transition hover:border-amber-500 hover:text-amber-400"
                >
                  로그아웃
                </button>
              </form>
            </div>
            <StartClientForm />
          </div>
        ) : (
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
            {enabledSocialLoginProviders.length > 0 ? (
              <>
                <p className="mb-4 text-sm text-slate-300">소셜 로그인 후 리포트 생성이 가능합니다.</p>
                <div className="flex flex-col gap-2">
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
                </div>
              </>
            ) : (
              <div className="space-y-2 text-sm text-slate-400">
                <p>소셜 OAuth 설정이 필요합니다.</p>
                <p className="text-xs">
                  <code className="rounded bg-slate-700 px-1 py-0.5">AUTH_GOOGLE_ID</code> 등을
                  <code className="ml-1 rounded bg-slate-700 px-1 py-0.5">.env</code>에 설정하세요.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
