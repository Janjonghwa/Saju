import { NextResponse } from "next/server";

import { fail, ok, createRequestId } from "@/lib/api";
import { AppError } from "@/lib/auth-errors";
import { createLogger } from "@/lib/logger";
import {
  checkRateLimit,
  getRateLimitKey,
  RATE_LIMIT_ANONYMOUS,
  RATE_LIMIT_WINDOW_MS,
} from "@/lib/rate-limit";
import { birthInputSchema, reportCreateSchema } from "@/lib/zod";
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

    const clientIp = getClientIp(request);
    const rateLimitKey = getRateLimitKey("anonymous", clientIp);
    const rateLimitResult = checkRateLimit(
      rateLimitKey,
      RATE_LIMIT_ANONYMOUS,
      RATE_LIMIT_WINDOW_MS,
    );
    const rateLimitHeaders = createRateLimitHeaders(
      RATE_LIMIT_ANONYMOUS,
      rateLimitResult.remaining,
      rateLimitResult.resetAt,
    );

    if (!rateLimitResult.allowed) {
      logger.warn("saju rate limit exceeded", {
        key: rateLimitKey,
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

    // 비로그인 사용자용 고유 ID 생성
    const anonymousId = `anon_${Date.now()}`;

    const result =
      theme === "daily"
        ? await generateDailyReport(anonymousId, input)
        : theme === "yearly"
          ? await generateYearlyReport(anonymousId, input, reportCreatePayload.targetYear)
          : theme === "spouse"
            ? await generateSpouseReport(anonymousId, input)
            : theme === "job"
              ? await generateJobReport(anonymousId, input)
              : await generateBasicReport(anonymousId, input);

    logger.info("saju report generated", { theme });

    return NextResponse.json(
      ok(result, requestId),
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
