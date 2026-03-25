import type { AccessLevel, ThemeReport } from "@/types/report";
import type { BasicAnalysis } from "@/server/analyzers/basic-analyzer";
import type { SajuChart } from "@/types/saju";
import type { InterpretationMessageRow } from "@/server/repositories/interpretation-repository";

const BASIC_ELEMENT_TAGS = new Set([
  "WOOD_STRONG",
  "FIRE_STRONG",
  "EARTH_STRONG",
  "METAL_STRONG",
  "WATER_STRONG",
  "GENERAL_BALANCE",
]);

const resolveSectionAccessLevel = (tag: string): AccessLevel => {
  if (tag.endsWith("_CHARACTER") || tag.endsWith("_LOVE")) {
    return "free";
  }

  if (tag.endsWith("_CAREER") || tag.endsWith("_HEALTH")) {
    return "premium";
  }

  if (tag.endsWith("_GENERATION") || tag.endsWith("_CONFLICT")) {
    return "premium";
  }

  if (BASIC_ELEMENT_TAGS.has(tag)) {
    return "free";
  }

  return "free";
};

export const composeBasicReport = (
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
      title: "사주 팔자",
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
    theme: "basic",
    score: analysis.score,
    tags: analysis.tags,
    summary: `원국 ${chart.yearPillar}/${chart.monthPillar}/${chart.dayPillar}/${chart.hourPillar} 기준 기본 해석입니다.`,
    warnings: analysis.warnings,
    recommendations: analysis.recommendations,
    sections,
    generatedAt: new Date().toISOString(),
  };
};
