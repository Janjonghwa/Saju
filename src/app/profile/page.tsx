import { auth } from "@/auth";

import { ProfileClient } from "@/app/profile/profile-client";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-10">
        <h1 className="text-2xl font-semibold">내 프로필</h1>
        <p className="text-sm text-zinc-700">로그인이 필요합니다.</p>
        <a href="/start" className="text-sm text-blue-700 underline">
          /start로 이동
        </a>
      </main>
    );
  }

  return <ProfileClient />;
}
