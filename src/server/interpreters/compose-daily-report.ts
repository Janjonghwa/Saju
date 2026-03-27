import type { BasicAnalysis } from "@/server/analyzers/basic-analyzer";
import type { InterpretationMessageRow } from "@/server/repositories/interpretation-repository";
import type { ThemeReport, AccessLevel } from "@/types/report";
import type { SajuChart } from "@/types/saju";

const DAILY_ELEMENT_TAGS = new Set([
  "WOOD_STRONG",
  "FIRE_STRONG",
  "EARTH_STRONG",
  "METAL_STRONG",
  "WATER_STRONG",
  "GENERAL_BALANCE",
]);

const resolveSectionAccessLevel = (_tag: string): AccessLevel => {
  // 모든 섹션 무료 제공 (나중에 프리미엄 전환 시 수정 가능)
  return "free";
};

export const composeDailyReport = (
  chart: SajuChart,
  analysis: BasicAnalysis,
  interpretations: InterpretationMessageRow[],
): ThemeReport => {
  const interpretationSections = interpretations.map((item) => {
    const sectionAccessLevel = resolveSectionAccessLevel(item.tag);

    return {
      title: item.title,
      content: item.content,
      accessLevel: sectionAccessLevel,
      sectionAccessLevel,
    };
  });

  const sections = [
    {
      title: "오늘의 운세 요약",
      content: `${chart.yearPillar} ${chart.monthPillar} ${chart.dayPillar} ${chart.hourPillar}`,
      accessLevel: "free" as const,
      sectionAccessLevel: "free" as const,
    },
    ...(interpretationSections.length > 0
      ? interpretationSections
      : [
          {
            title: "요약 해석",
            content: "해석 템플릿이 없어서 기본 요약을 제공합니다.",
            accessLevel: "free" as const,
            sectionAccessLevel: "free" as const,
          },
        ]),
  ];

  return {
    theme: "daily",
    score: analysis.score,
    tags: analysis.tags,
    summary: "오늘의 운세 기준 기본 해석입니다.",
    warnings: analysis.warnings,
    recommendations: analysis.recommendations,
    sections,
    generatedAt: new Date().toISOString(),
  };
};
