import { describe, expect, it } from "vitest";

import { gateReportSections } from "@/server/services/access-gate";
import type { ReportSection } from "@/types/report";

const sections: ReportSection[] = [
  {
    title: "무료 섹션",
    content: "무료 내용",
    accessLevel: "free",
    sectionAccessLevel: "free",
  },
  {
    title: "유료 섹션",
    content: "유료 원본 내용",
    accessLevel: "free",
    sectionAccessLevel: "premium",
  },
];

describe("gateReportSections", () => {
  it("returns all sections unchanged for admin role", () => {
    const result = gateReportSections(sections, "admin");

    expect(result).toEqual(sections);
  });

  it("masks premium sections for user role", () => {
    const result = gateReportSections(sections, "user");

    const premiumSection = result.find((section) => section.title === "유료 섹션");
    expect(premiumSection?.content).toBe("[프리미엄] 업그레이드 후 이용 가능합니다.");
  });

  it("keeps free sections unchanged for user role", () => {
    const result = gateReportSections(sections, "user");

    const freeSection = result.find((section) => section.title === "무료 섹션");
    expect(freeSection?.content).toBe("무료 내용");
  });
});
