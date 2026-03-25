"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type ProfileData = {
  name: string | null;
  email: string;
  image: string | null;
  createdAt: string;
};

type ApiSuccess<T> = {
  success: true;
  data: T;
  requestId: string;
};

type ApiFailure = {
  success: false;
  errorCode: string;
  message: string;
  requestId: string;
  retryable?: boolean;
  details?: Record<string, unknown>;
};

type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

const profileDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const readErrorMessage = async (response: Response) => {
  try {
    const payload = (await response.json()) as ApiResponse<unknown>;
    if (!payload.success) {
      return payload.message;
    }
  } catch {
    // ignore parse errors and fallback to default message
  }

  return "요청 처리 중 오류가 발생했습니다.";
};

export function ProfileClient() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const createdAtLabel = useMemo(() => {
    if (!profile?.createdAt) {
      return "-";
    }

    const createdAtDate = new Date(profile.createdAt);
    if (Number.isNaN(createdAtDate.getTime())) {
      return "-";
    }

    return profileDateFormatter.format(createdAtDate);
  }, [profile?.createdAt]);

  const loadProfile = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/profile", {
        method: "GET",
      });

      if (!response.ok) {
        setErrorMessage(await readErrorMessage(response));
        setProfile(null);
        setName("");
        return;
      }

      const payload = (await response.json()) as ApiResponse<ProfileData>;

      if (!payload.success) {
        setErrorMessage(payload.message);
        setProfile(null);
        setName("");
        return;
      }

      setProfile(payload.data);
      setName(payload.data.name ?? "");
    } catch {
      setErrorMessage("프로필 정보를 불러오지 못했습니다.");
      setProfile(null);
      setName("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProfile();
  }, []);

  const onSubmitName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const payload = (await response.json()) as ApiResponse<ProfileData>;

      if (!response.ok || !payload.success) {
        const message = payload.success
          ? "프로필 수정에 실패했습니다."
          : payload.message;
        setErrorMessage(message);
        return;
      }

      setProfile(payload.data);
      setName(payload.data.name ?? "");
      setSuccessMessage("이름이 저장되었습니다.");
    } catch {
      setErrorMessage("프로필 수정 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const onDeleteAccount = async () => {
    const confirmed = window.confirm(
      "정말 탈퇴하시겠습니까? 계정과 모든 데이터가 즉시 삭제되며 복구할 수 없습니다.",
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/profile", {
        method: "DELETE",
      });

      if (!response.ok) {
        setErrorMessage(await readErrorMessage(response));
        return;
      }

      const payload = (await response.json()) as ApiResponse<{ deleted: boolean }>;
      if (!payload.success || !payload.data.deleted) {
        setErrorMessage("회원 탈퇴 처리에 실패했습니다.");
        return;
      }

      window.location.href = "/start";
    } catch {
      setErrorMessage("회원 탈퇴 처리 중 오류가 발생했습니다.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold">내 프로필</h1>

      <div className="rounded-xl border border-zinc-200 p-5">
        <Link href="/start" className="text-sm text-blue-700 underline">
          /start로 이동
        </Link>
      </div>

      <section className="space-y-4 rounded-xl border border-zinc-200 p-5">
        <h2 className="text-lg font-medium">기본 정보</h2>

        {loading ? (
          <p className="text-sm text-zinc-600">프로필 정보를 불러오는 중...</p>
        ) : profile ? (
          <div className="space-y-2 text-sm text-zinc-700">
            <p>이메일: {profile.email}</p>
            <p>프로필 이름: {profile.name ?? "(미설정)"}</p>
            <p>가입일: {createdAtLabel}</p>
            <p>프로필 이미지: {profile.image ?? "(없음)"}</p>
          </div>
        ) : (
          <p className="text-sm text-red-600">프로필 정보를 확인할 수 없습니다.</p>
        )}
      </section>

      <section className="space-y-4 rounded-xl border border-zinc-200 p-5">
        <h2 className="text-lg font-medium">이름 수정</h2>

        <form onSubmit={onSubmitName} className="space-y-3">
          <label className="block text-sm text-zinc-700">
            이름
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={saving || loading || !profile}
              className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              maxLength={50}
            />
          </label>

          <button
            type="submit"
            disabled={saving || loading || !profile}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-60"
          >
            {saving ? "저장 중..." : "이름 저장"}
          </button>
        </form>
      </section>

      <section className="space-y-4 rounded-xl border border-red-200 bg-red-50 p-5">
        <h2 className="text-lg font-medium text-red-700">계정 삭제</h2>
        <p className="text-sm text-red-700">
          계정을 삭제하면 로그인 계정, 세션, 출생 프로필, 리포트, 로그가 모두 즉시
          삭제되며 복구할 수 없습니다.
        </p>

        <button
          type="button"
          onClick={onDeleteAccount}
          disabled={deleting || loading || !profile}
          className="rounded-md bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-60"
        >
          {deleting ? "삭제 중..." : "계정 삭제"}
        </button>
      </section>

      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
      {successMessage ? <p className="text-sm text-green-700">{successMessage}</p> : null}
    </main>
  );
}
