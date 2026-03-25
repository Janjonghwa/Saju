import { z } from "zod";

export const birthInputSchema = z.object({
  calendarType: z.enum(["solar", "lunar"]),
  isLeapMonth: z.boolean(),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "birthDate must be YYYY-MM-DD")
    .refine((dateStr) => {
      const parsedDate = new Date(dateStr);

      if (Number.isNaN(parsedDate.getTime())) {
        return false;
      }

      const normalizedDate = `${parsedDate.getUTCFullYear()}-${String(parsedDate.getUTCMonth() + 1).padStart(2, "0")}-${String(parsedDate.getUTCDate()).padStart(2, "0")}`;
      if (normalizedDate !== dateStr) {
        return false;
      }

      const [year, month, day] = dateStr.split("-").map(Number);
      const inputDateTime = Date.UTC(year, month - 1, day);
      const minDateTime = Date.UTC(1900, 0, 1);

      const today = new Date();
      const todayDateTime = Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );

      return inputDateTime >= minDateTime && inputDateTime <= todayDateTime;
    }, "유효한 날짜를 입력해주세요 (1900년 이후)"),
  birthTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "birthTime must be HH:mm")
    .refine((timeStr) => {
      const [hour, minute] = timeStr.split(":").map(Number);

      return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
    }, "유효한 시간을 입력해주세요 (00:00~23:59)"),
  gender: z.enum(["male", "female"]),
  timezone: z.string().default("Asia/Seoul"),
}).refine(
  ({ calendarType, isLeapMonth }) => {
    if (calendarType === "solar" && isLeapMonth) {
      return false;
    }

    return true;
  },
  {
    message: "양력일 때는 윤달을 선택할 수 없습니다",
    path: ["isLeapMonth"],
  },
);

export const reportCreateSchema = z.object({
  birthProfileId: z.string().min(1),
  theme: z.enum(["basic", "daily", "yearly", "spouse", "job"]),
  targetYear: z.number().int().optional(),
});

export type BirthInputSchema = z.infer<typeof birthInputSchema>;
export type ReportCreateSchema = z.infer<typeof reportCreateSchema>;
