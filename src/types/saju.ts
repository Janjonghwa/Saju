export type CalendarType = "solar" | "lunar";
export type Gender = "male" | "female";

export type BirthInput = {
  calendarType: CalendarType;
  isLeapMonth: boolean;
  birthDate: string;
  birthTime: string;
  gender: Gender;
  timezone: string;
};

export type SajuChart = {
  yearPillar: string;
  monthPillar: string;
  dayPillar: string;
  hourPillar: string;
  heavenlyStems: string[];
  earthlyBranches: string[];
  elementCounts: Record<string, number>;
  tenGods: string[];
  hiddenStems: Record<string, string[]>;
  specialRelations: string[];
  daewoon: string[];
  yearlyFlow: string[];
};
