import { calculateSaju, lunarToSolar } from "@fullstackfamily/manseryeok";

import { AppError } from "@/lib/auth-errors";
import type { BirthInput, SajuChart } from "@/types/saju";

const STEM_TO_ELEMENT: Record<string, keyof SajuChart["elementCounts"]> = {
  갑: "wood",
  을: "wood",
  병: "fire",
  정: "fire",
  무: "earth",
  기: "earth",
  경: "metal",
  신: "metal",
  임: "water",
  계: "water",
};

const toSolarInput = (input: BirthInput) => {
  const [year, month, day] = input.birthDate.split("-").map(Number);

  if (input.calendarType === "lunar") {
    const converted = lunarToSolar(year, month, day, input.isLeapMonth);

    return {
      year: converted.solar.year,
      month: converted.solar.month,
      day: converted.solar.day,
    };
  }

  return { year, month, day };
};

const parseHourMinute = (birthTime: string) => {
  const [hour, minute] = birthTime.split(":").map(Number);
  return { hour, minute };
};

const toElementCounts = (stems: string[]) => {
  const counts: SajuChart["elementCounts"] = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  };

  stems.forEach((stem) => {
    const element = STEM_TO_ELEMENT[stem];
    if (element) {
      counts[element] += 1;
    }
  });

  return counts;
};

export const calculateSajuChart = (input: BirthInput): SajuChart => {
  try {
    const solar = toSolarInput(input);
    const { hour, minute } = parseHourMinute(input.birthTime);

    const saju = calculateSaju(
      solar.year,
      solar.month,
      solar.day,
      hour,
      minute,
      {
        longitude: 127,
        applyTimeCorrection: true,
      },
    );

    const heavenlyStems = [
      saju.yearPillar[0],
      saju.monthPillar[0],
      saju.dayPillar[0],
      saju.hourPillar?.[0] ?? "",
    ].filter(Boolean);

    const earthlyBranches = [
      saju.yearPillar[1],
      saju.monthPillar[1],
      saju.dayPillar[1],
      saju.hourPillar?.[1] ?? "",
    ].filter(Boolean);

    return {
      yearPillar: saju.yearPillar,
      monthPillar: saju.monthPillar,
      dayPillar: saju.dayPillar,
      hourPillar: saju.hourPillar ?? "미상",
      heavenlyStems,
      earthlyBranches,
      elementCounts: toElementCounts(heavenlyStems),
      tenGods: [],
      hiddenStems: {
        year: [],
        month: [],
        day: [],
        hour: [],
      },
      specialRelations: [],
      daewoon: [],
      yearlyFlow: [],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "사주 계산 실패";
    throw new AppError(message, "CHART_CALCULATION_FAILED", 500);
  }
};
