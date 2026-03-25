import { describe, expect, it } from "vitest";
import { calculateSaju, lunarToSolar } from "@fullstackfamily/manseryeok";

import goldenCases from "./golden-cases.json";

describe("golden cases dataset", () => {
  it("has exactly 25 initial cases", () => {
    expect(goldenCases.cases).toHaveLength(25);
  });

  it("includes required categories", () => {
    const categories = new Set(goldenCases.cases.map((item) => item.category));

    expect(categories.has("normal")).toBe(true);
    expect(categories.has("jasi-boundary")).toBe(true);
    expect(categories.has("jeolip-boundary")).toBe(true);
    expect(categories.has("leap-month")).toBe(true);
    expect(categories.has("leap-day")).toBe(true);
    expect(categories.has("year-boundary")).toBe(true);
  });

  it("enforces complete expected pillars for active cases", () => {
    const activeCases = goldenCases.cases.filter((item) => item.status === "active");

    activeCases.forEach((item) => {
      expect(item.expected.yearPillar).toBeTruthy();
      expect(item.expected.monthPillar).toBeTruthy();
      expect(item.expected.dayPillar).toBeTruthy();
      expect(item.expected.hourPillar).toBeTruthy();
      expect(item.reference).toBeTruthy();
      expect(item.referenceVersion).toBeTruthy();
    });
  });

  it("matches engine output for active golden cases", () => {
    const activeCases = goldenCases.cases.filter((item) => item.status === "active");

    activeCases.forEach((item) => {
      const [yy, mm, dd] = item.input.birthDate.split("-").map(Number);
      let year = yy;
      let month = mm;
      let day = dd;

      if (item.input.calendarType === "lunar") {
        const solar = lunarToSolar(yy, mm, dd, item.input.isLeapMonth);
        year = solar.solar.year;
        month = solar.solar.month;
        day = solar.solar.day;
      }

      const [hour, minute] = item.input.birthTime.split(":").map(Number);
      const saju = calculateSaju(year, month, day, hour, minute, {
        longitude: 127,
        applyTimeCorrection: true,
      });

      expect(saju.yearPillar).toBe(item.expected.yearPillar);
      expect(saju.monthPillar).toBe(item.expected.monthPillar);
      expect(saju.dayPillar).toBe(item.expected.dayPillar);
      expect(saju.hourPillar ?? "미상").toBe(item.expected.hourPillar);
    });
  });
});
