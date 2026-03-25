"use client";

import { useState } from "react";

type FormState = {
  calendarType: "solar" | "lunar";
  isLeapMonth: boolean;
  birthDate: string;
  birthTime: string;
  gender: "male" | "female";
  timezone: string;
};

type ReportSection = {
  title: string;
  content: string;
  accessLevel?: string;
  sectionAccessLevel?: string;
};

type ReportData = {
  chart: Record<string, unknown>;
  report: {
    theme: string;
    score?: number;
    tags: string[];
    summary: string;
    sections: ReportSection[];
  };
  reportId: string;
};

const initialState: FormState = {
  calendarType: "solar",
  isLeapMonth: false,
  birthDate: "1990-05-15",
  birthTime: "14:30",
  gender: "male",
  timezone: "Asia/Seoul",
};

const themes = [
  { value: "basic", label: "기본 사주" },
  { value: "daily", label: "오늘의 운세" },
  { value: "yearly", label: "올해의 운세" },
  { value: "spouse", label: "배우자운" },
  { value: "job", label: "취업운" },
];

export function StartClientForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [theme, setTheme] = useState("basic");
  const [result, setResult] = useState<ReportData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch("/api/saju", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, theme }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.message);
      }
    } catch {
      setError("요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-slate-700 bg-slate-800/50 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-white">사주 정보 입력</h3>

        {/* Theme selector */}
        <label className="block text-sm text-slate-300">
          리포트 종류
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
          >
            {themes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-slate-300">
            생년월일
            <input
              type="date"
              value={form.birthDate}
              onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
            />
          </label>
          <label className="block text-sm text-slate-300">
            출생시간
            <input
              type="time"
              value={form.birthTime}
              onChange={(e) => setForm({ ...form, birthTime: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-sm text-slate-300">
            달력
            <select
              value={form.calendarType}
              onChange={(e) => setForm({ ...form, calendarType: e.target.value as "solar" | "lunar" })}
              className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="solar">양력</option>
              <option value="lunar">음력</option>
            </select>
          </label>
          <label className="block text-sm text-slate-300">
            성별
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value as "male" | "female" })}
              className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </label>
          <label className="flex items-end gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.isLeapMonth}
              onChange={(e) => setForm({ ...form, isLeapMonth: e.target.checked })}
              className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
            />
            윤달
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-400 disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              분석 중...
            </span>
          ) : "리포트 생성"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
            <h3 className="mb-2 text-lg font-semibold text-amber-400">{themes.find(t => t.value === result.report.theme)?.label} 리포트</h3>
            <p className="text-sm text-slate-300">{result.report.summary}</p>
            {result.report.score !== undefined && (
              <p className="mt-2 text-sm text-slate-400">점수: <span className="font-semibold text-white">{result.report.score}점</span></p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {result.report.sections.map((section, i) => (
              <div key={i} className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                <h4 className="mb-1 text-sm font-semibold text-amber-400">{section.title}</h4>
                <p className="whitespace-pre-line text-sm text-slate-300">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <a
              href={`/api/report?id=${result.reportId}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-600 px-4 py-2 text-xs text-slate-300 transition hover:border-amber-500 hover:text-amber-400"
            >
              JSON 보기
            </a>
            <a
              href={`/report/${result.reportId}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-600 px-4 py-2 text-xs text-slate-300 transition hover:border-amber-500 hover:text-amber-400"
            >
              PDF 다운로드
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
