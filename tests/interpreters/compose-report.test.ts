import { describe, expect, it } from "vitest";

import { composeBasicReport } from "@/server/interpreters/compose-report";
import type { InterpretationMessageRow } from "@/server/repositories/interpretation-repository";
import type { SajuChart } from "@/types/saju";

const baseChart: SajuChart = {
  yearPillar: "갑자",
  monthPillar: "을축",
  dayPillar: "병인",
  hourPillar: "정묘",
  heavenlyStems: ["갑", "을", "병", "정"],
  earthlyBranches: ["자", "축", "인", "묘"],
  elementCounts: { wood: 2, fire: 1, earth: 1, metal: 0, water: 0 },
  tenGods: [],
  hiddenStems: {},
  specialRelations: [],
  daewoon: [],
  yearlyFlow: [],
};

describe("composeBasicReport", () => {
  it("produces the expected report structure", () => {
    const report = composeBasicReport(
      baseChart,
      {
        score: 70,
        tags: ["WOOD_STRONG"],
        warnings: [],
        recommendations: ["루틴 조정"],
      },
      [],
    );

    expect(report.theme).toBe("basic");
    expect(report.score).toBe(70);
    expect(report.tags).toEqual(["WOOD_STRONG"]);
    expect(report.warnings).toEqual([]);
    expect(report.recommendations).toEqual(["루틴 조정"]);
    expect(typeof report.generatedAt).toBe("string");
    expect(report.sections.length).toBeGreaterThanOrEqual(1);
  });

  it('includes "사주 팔자" section and interpretation sections', () => {
    const interpretations: InterpretationMessageRow[] = [
      {
        tag: "WOOD_STRONG_CHARACTER",
        title: "성향",
        content: "성향 해석",
        priority: 10,
      },
      {
        tag: "WOOD_STRONG_CAREER",
        title: "직업",
        content: "직업 해석",
        priority: 8,
      },
    ];

    const report = composeBasicReport(
      baseChart,
      {
        score: 70,
        tags: ["WOOD_STRONG", "WOOD_STRONG_CHARACTER", "WOOD_STRONG_CAREER"],
        warnings: [],
        recommendations: [],
      },
      interpretations,
    );

    expect(report.sections[0]?.title).toBe("사주 팔자");
    expect(report.sections[0]?.content).toBe("갑자 을축 병인 정묘");
    expect(report.sections.map((section) => section.title)).toEqual([
      "사주 팔자",
      "성향",
      "직업",
    ]);
  });

  it("formats summary with all four pillars", () => {
    const report = composeBasicReport(
      baseChart,
      {
        score: 70,
        tags: [],
        warnings: [],
        recommendations: [],
      },
      [],
    );

    expect(report.summary).toBe("원국 갑자/을축/병인/정묘 기준 기본 해석입니다.");
  });

  it("resolves accessLevel correctly for free and premium interpretation tags", () => {
    const interpretations: InterpretationMessageRow[] = [
      {
        tag: "WOOD_STRONG_CHARACTER",
        title: "성향",
        content: "무료 섹션",
        priority: 10,
      },
      {
        tag: "WATER_FIRE_CONFLICT",
        title: "충돌",
        content: "유료 섹션",
        priority: 9,
      },
    ];

    const report = composeBasicReport(
      baseChart,
      {
        score: 70,
        tags: ["WOOD_STRONG_CHARACTER", "WATER_FIRE_CONFLICT"],
        warnings: [],
        recommendations: [],
      },
      interpretations,
    );

    const characterSection = report.sections.find((section) => section.title === "성향");
    const conflictSection = report.sections.find((section) => section.title === "충돌");

    expect(characterSection?.accessLevel).toBe("free");
    expect(characterSection?.sectionAccessLevel).toBe("free");
    expect(conflictSection?.accessLevel).toBe("premium");
    expect(conflictSection?.sectionAccessLevel).toBe("premium");
  });
});
