import { AppError } from "@/lib/auth-errors";
import { analyzeBasicChart } from "@/server/analyzers/basic-analyzer";
import { calculateSajuChart } from "@/server/engines/saju-core";
import { composeDailyReport } from "@/server/interpreters/compose-daily-report";
import { createBirthProfile } from "@/server/repositories/birth-profile-repository";
import { findInterpretationsByTagsAndTheme } from "@/server/repositories/interpretation-repository";
import { createReportLog } from "@/server/repositories/report-log-repository";
import { createReport } from "@/server/repositories/report-repository";
import type { BirthInput } from "@/types/saju";

export const generateDailyReport = async (userId: string, input: BirthInput) => {
  try {
    const birthProfile = await createBirthProfile(userId, input);
    const chart = calculateSajuChart(input);
    const analysis = analyzeBasicChart(chart);
    const interpretationRows = await findInterpretationsByTagsAndTheme(
      analysis.tags,
      "daily",
    );
    const reportPayload = composeDailyReport(chart, analysis, interpretationRows);

    const report = await createReport({
      userId,
      birthProfileId: birthProfile.id,
      theme: "daily",
      report: reportPayload,
    });

    await createReportLog({
      reportId: report.id,
      requestPayload: input,
      generatedTags: reportPayload.tags,
    });

    return {
      chart,
      report: reportPayload,
      reportId: report.id,
      birthProfileId: birthProfile.id,
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "리포트 생성 중 오류가 발생했습니다.",
      "REPORT_GENERATION_FAILED",
      500,
    );
  }
};
