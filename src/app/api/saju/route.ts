import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { fail, ok, createRequestId } from "@/lib/api";
import { AppError } from "@/lib/auth-errors";
import { createLogger } from "@/lib/logger";
import {
  checkRateLimit,
  getRateLimitKey,
  RATE_LIMIT_ANONYMOUS,
  RATE_LIMIT_AUTHENTICATED,
  RATE_LIMIT_WINDOW_MS,
} from "@/lib/rate-limit";
import { birthInputSchema, reportCreateSchema } from "@/lib/zod";
import { findUserRole } from "@/server/repositories/user-repository";
import { gateReportSections } from "@/server/services/access-gate";
import { generateBasicReport } from "@/server/services/generate-basic-report";
import { generateDailyReport } from "@/server/services/generate-daily-report";
import { generateJobReport } from "@/server/services/generate-job-report";
import { generateSpouseReport } from "@/server/services/generate-spouse-report";
import { generateYearlyReport } from "@/server/services/generate-yearly-report";

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
};

const createRateLimitHeaders = (
  limit: number,
  remaining: number,
  resetAt: number,
) => ({
  "X-RateLimit-Limit": String(limit),
  "X-RateLimit-Remaining": String(remaining),
  "X-RateLimit-Reset": String(resetAt),
});

export async function POST(request: Request) {
  const requestId = createRequestId();
  const logger = createLogger(requestId);

  try {
    logger.info("saju request received", { method: "POST", path: "/api/saju" });

    const session = await auth();

    if (!session?.user?.id) {
      logger.warn("saju unauthorized access", { path: "/api/saju" });

      return NextResponse.json(
        fail("UNAUTHORIZED", "로그인이 필요합니다.", requestId),
        { status: 401 },
      );
    }

    const clientIp = getClientIp(request);
    const rateLimitKey = getRateLimitKey(session.user.id, clientIp);
    const rateLimitLimit = session.user.id
      ? RATE_LIMIT_AUTHENTICATED
      : RATE_LIMIT_ANONYMOUS;
    const rateLimitResult = checkRateLimit(
      rateLimitKey,
      rateLimitLimit,
      RATE_LIMIT_WINDOW_MS,
    );
    const rateLimitHeaders = createRateLimitHeaders(
      rateLimitLimit,
      rateLimitResult.remaining,
      rateLimitResult.resetAt,
    );

    if (!rateLimitResult.allowed) {
      logger.warn("saju rate limit exceeded", {
        key: rateLimitKey,
        limit: rateLimitLimit,
        resetAt: rateLimitResult.resetAt,
      });

      return NextResponse.json(
        fail("RATE_LIMITED", "요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.", requestId),
        {
          status: 429,
          headers: rateLimitHeaders,
        },
      );
    }

    const payload = await request.json();
    const input = birthInputSchema.parse(payload);
    const reportCreatePayload = reportCreateSchema
      .pick({ theme: true, targetYear: true })
      .partial()
      .parse(payload);
    const theme = reportCreatePayload.theme ?? "basic";

    const result =
      theme === "daily"
        ? await generateDailyReport(session.user.id, input)
        : theme === "yearly"
          ? await generateYearlyReport(session.user.id, input, reportCreatePayload.targetYear)
          : theme === "spouse"
            ? await generateSpouseReport(session.user.id, input)
            : theme === "job"
              ? await generateJobReport(session.user.id, input)
              : await generateBasicReport(session.user.id, input);
    const userRole = await findUserRole(session.user.id);

    if (!userRole) {
      throw new AppError("사용자 정보를 찾을 수 없습니다.", "UNAUTHORIZED", 401);
    }

    const gatedSections = gateReportSections(result.report.sections, userRole);

    logger.info("saju report generated", {
      userId: session.user.id,
      role: userRole,
    });

    return NextResponse.json(
      ok(
        {
          ...result,
          report: {
            ...result.report,
            sections: gatedSections,
          },
        },
        requestId,
      ),
      {
        headers: rateLimitHeaders,
      },
    );
  } catch (error) {
    logger.error("saju request failed", {
      message: error instanceof Error ? error.message : "unknown error",
      name: error instanceof Error ? error.name : "unknown",
    });

    if (error instanceof AppError) {
      return NextResponse.json(fail(error.code, error.message, requestId), {
        status: error.status,
      });
    }

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        fail("INVALID_INPUT", "입력값 검증에 실패했습니다.", requestId),
        { status: 400 },
      );
    }

    return NextResponse.json(
      fail("INTERNAL_ERROR", "알 수 없는 오류가 발생했습니다.", requestId),
      { status: 500 },
    );
  }
}
