import { prisma } from "@/lib/prisma";
import type { ThemeReport } from "@/types/report";

export const createReport = async (params: {
  userId: string;
  birthProfileId: string;
  theme: "basic" | "daily" | "yearly" | "spouse" | "job";
  targetYear?: number;
  report: ThemeReport;
}) =>
  prisma.report.create({
    data: {
      userId: params.userId,
      birthProfileId: params.birthProfileId,
      theme: params.theme,
      targetYear: params.targetYear,
      summary: params.report.summary,
      score: params.report.score,
      tags: params.report.tags,
      result: params.report,
    },
  });

export const findReportById = async (id: string) => prisma.report.findUnique({ where: { id } });
