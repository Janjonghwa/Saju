import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const createReportLog = async (params: {
  reportId: string;
  requestPayload: Prisma.InputJsonValue;
  generatedTags: string[];
}) =>
  prisma.reportLog.create({
    data: {
      reportId: params.reportId,
      requestPayload: params.requestPayload,
      generatedTags: params.generatedTags,
    },
  });
