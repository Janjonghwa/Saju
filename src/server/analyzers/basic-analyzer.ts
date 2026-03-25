import type { SajuChart } from "@/types/saju";

export type BasicAnalysis = {
  score: number;
  tags: string[];
  warnings: string[];
  recommendations: string[];
};

export const analyzeBasicChart = (chart: SajuChart): BasicAnalysis => {
  const tags: string[] = [];
  const { elementCounts } = chart;

  if (elementCounts.wood >= 2) {
    tags.push(
      "WOOD_STRONG",
      "WOOD_STRONG_CHARACTER",
      "WOOD_STRONG_CAREER",
      "WOOD_STRONG_LOVE",
      "WOOD_STRONG_HEALTH",
    );
  }

  if (elementCounts.fire >= 2) {
    tags.push(
      "FIRE_STRONG",
      "FIRE_STRONG_CHARACTER",
      "FIRE_STRONG_CAREER",
      "FIRE_STRONG_LOVE",
      "FIRE_STRONG_HEALTH",
    );
  }

  if (elementCounts.earth >= 2) {
    tags.push(
      "EARTH_STRONG",
      "EARTH_STRONG_CHARACTER",
      "EARTH_STRONG_CAREER",
      "EARTH_STRONG_LOVE",
      "EARTH_STRONG_HEALTH",
    );
  }

  if (elementCounts.metal >= 2) {
    tags.push(
      "METAL_STRONG",
      "METAL_STRONG_CHARACTER",
      "METAL_STRONG_CAREER",
      "METAL_STRONG_LOVE",
      "METAL_STRONG_HEALTH",
    );
  }

  if (elementCounts.water >= 2) {
    tags.push(
      "WATER_STRONG",
      "WATER_STRONG_CHARACTER",
      "WATER_STRONG_CAREER",
      "WATER_STRONG_LOVE",
      "WATER_STRONG_HEALTH",
    );
  }

  if (elementCounts.wood >= 1 && elementCounts.fire >= 1) {
    tags.push("WOOD_FIRE_GENERATION");
  }

  if (elementCounts.fire >= 1 && elementCounts.earth >= 1) {
    tags.push("FIRE_EARTH_GENERATION");
  }

  if (elementCounts.earth >= 1 && elementCounts.metal >= 1) {
    tags.push("EARTH_METAL_GENERATION");
  }

  if (elementCounts.metal >= 1 && elementCounts.water >= 1) {
    tags.push("METAL_WATER_GENERATION");
  }

  if (elementCounts.water >= 1 && elementCounts.wood >= 1) {
    tags.push("WATER_WOOD_GENERATION");
  }

  if (elementCounts.wood >= 1 && elementCounts.earth >= 1) {
    tags.push("WOOD_EARTH_CONFLICT");
  }

  if (elementCounts.fire >= 1 && elementCounts.metal >= 1) {
    tags.push("FIRE_METAL_CONFLICT");
  }

  if (elementCounts.earth >= 1 && elementCounts.water >= 1) {
    tags.push("EARTH_WATER_CONFLICT");
  }

  if (elementCounts.metal >= 1 && elementCounts.wood >= 1) {
    tags.push("METAL_WOOD_CONFLICT");
  }

  if (elementCounts.water >= 1 && elementCounts.fire >= 1) {
    tags.push("WATER_FIRE_CONFLICT");
  }

  const hasStrongElement =
    elementCounts.wood >= 2 ||
    elementCounts.fire >= 2 ||
    elementCounts.earth >= 2 ||
    elementCounts.metal >= 2 ||
    elementCounts.water >= 2;

  if (!hasStrongElement) tags.push("GENERAL_BALANCE");

  return {
    score: 70,
    tags,
    warnings: [],
    recommendations: ["오행 균형을 중심으로 일상 루틴을 조정해보세요."],
  };
};
