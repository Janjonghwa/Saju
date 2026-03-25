import { describe, expect, it } from "vitest";

import { analyzeBasicChart } from "@/server/analyzers/basic-analyzer";
import type { SajuChart } from "@/types/saju";

const createChart = (elementCounts: Record<string, number>): SajuChart => ({
  yearPillar: "갑자",
  monthPillar: "을축",
  dayPillar: "병인",
  hourPillar: "정묘",
  heavenlyStems: ["갑", "을", "병", "정"],
  earthlyBranches: ["자", "축", "인", "묘"],
  elementCounts,
  tenGods: [],
  hiddenStems: {},
  specialRelations: [],
  daewoon: [],
  yearlyFlow: [],
});

describe("analyzeBasicChart", () => {
  it("adds WOOD_STRONG and wood sub-tags when wood >= 2", () => {
    const chart = createChart({
      wood: 2,
      fire: 0,
      earth: 0,
      metal: 0,
      water: 0,
    });

    const result = analyzeBasicChart(chart);

    expect(result.tags).toContain("WOOD_STRONG");
    expect(result.tags).toContain("WOOD_STRONG_CHARACTER");
    expect(result.tags).toContain("WOOD_STRONG_CAREER");
    expect(result.tags).toContain("WOOD_STRONG_LOVE");
    expect(result.tags).toContain("WOOD_STRONG_HEALTH");
  });

  it("adds GENERAL_BALANCE when no element is strong", () => {
    const chart = createChart({
      wood: 1,
      fire: 1,
      earth: 1,
      metal: 1,
      water: 1,
    });

    const result = analyzeBasicChart(chart);

    expect(result.tags).toContain("GENERAL_BALANCE");
  });

  it("adds generation tags when matching generation element pairs are present", () => {
    const chart = createChart({
      wood: 1,
      fire: 1,
      earth: 1,
      metal: 1,
      water: 1,
    });

    const result = analyzeBasicChart(chart);

    expect(result.tags).toContain("WOOD_FIRE_GENERATION");
    expect(result.tags).toContain("FIRE_EARTH_GENERATION");
    expect(result.tags).toContain("EARTH_METAL_GENERATION");
    expect(result.tags).toContain("METAL_WATER_GENERATION");
    expect(result.tags).toContain("WATER_WOOD_GENERATION");
  });

  it("adds conflict tags when matching conflict element pairs are present", () => {
    const chart = createChart({
      wood: 1,
      fire: 1,
      earth: 1,
      metal: 1,
      water: 1,
    });

    const result = analyzeBasicChart(chart);

    expect(result.tags).toContain("WOOD_EARTH_CONFLICT");
    expect(result.tags).toContain("FIRE_METAL_CONFLICT");
    expect(result.tags).toContain("EARTH_WATER_CONFLICT");
    expect(result.tags).toContain("METAL_WOOD_CONFLICT");
    expect(result.tags).toContain("WATER_FIRE_CONFLICT");
  });

  it("always returns score 70 regardless of element counts", () => {
    const lowCountsChart = createChart({
      wood: 0,
      fire: 0,
      earth: 0,
      metal: 0,
      water: 0,
    });

    const highCountsChart = createChart({
      wood: 3,
      fire: 2,
      earth: 4,
      metal: 1,
      water: 2,
    });

    expect(analyzeBasicChart(lowCountsChart).score).toBe(70);
    expect(analyzeBasicChart(highCountsChart).score).toBe(70);
  });
});
