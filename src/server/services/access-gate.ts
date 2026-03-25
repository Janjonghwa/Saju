import type { ReportSection } from "@/types/report";

const PREMIUM_PLACEHOLDER = "[프리미엄] 업그레이드 후 이용 가능합니다.";

export const gateReportSections = (
  sections: ReportSection[],
  userRole: string,
): ReportSection[] => {
  if (userRole === "admin") {
    return sections;
  }

  return sections.map((section) => {
    const sectionAccessLevel = section.sectionAccessLevel ?? section.accessLevel;

    if (sectionAccessLevel !== "premium") {
      return section;
    }

    return {
      ...section,
      content: PREMIUM_PLACEHOLDER,
    };
  });
};
