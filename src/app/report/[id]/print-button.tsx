"use client";

export function ReportPrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white print:hidden"
    >
      PDF 다운로드
    </button>
  );
}
