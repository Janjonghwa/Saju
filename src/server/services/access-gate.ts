import type { ReportSection } from "@/types/report";

// 모든 섹션 통과 (나중에 프리미엄 전환 시 수정 가능)
export const gateReportSections = (
  sections: ReportSection[],
  _userRole?: string,
): ReportSection[] => {
  return sections;
};
