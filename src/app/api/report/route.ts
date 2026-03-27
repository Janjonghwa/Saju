import { NextResponse } from "next/server";

import { createRequestId, fail, ok } from "@/lib/api";
import { AppError } from "@/lib/auth-errors";
import { createLogger } from "@/lib/logger";
import {
  checkRateLimit,
  getRateLimitKey,
  RATE_LIMIT_ANONYMOUS,
  RATE_LIMIT_WINDOW_MS,
} from "@/lib/rate-limit";
import { findReportById } from "@/server/repositories/report-repository";
import type { ThemeReport } from "@/types/report";

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

export async function GET(request: Request) {
  const requestId = createRequestId();
  const logger = createLogger(requestId);

  try {
    logger.info("report request received", { method: "GET", path: "/api/report" });

    const url = new URL(request.url);
    const reportId = url.searchParams.get("id");

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
      logger.warn("report rate limit exceeded", {
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

    if (!reportId) {
      return NextResponse.json(
        fail("INVALID_INPUT", "report id가 필요합니다.", requestId),
        { status: 400 },
      );
    }

    const report = await findReportById(reportId);

    if (!report) {
      return NextResponse.json(
        fail("FORBIDDEN", "리포트를 찾을 수 없습니다.", requestId),
        { status: 403 },
      );
    }

    const reportResult = report.result as ThemeReport;

    logger.info("report fetched", { reportId });

    return NextResponse.json(
      ok(report, requestId),
      {
        headers: rateLimitHeaders,
      },
    );
  } catch (error) {
    logger.error("report request failed", {
      message: error instanceof Error ? error.message : "unknown error",
      name: error instanceof Error ? error.name : "unknown",
    });

    if (error instanceof AppError) {
      return NextResponse.json(fail(error.code, error.message, requestId), {
        status: error.status,
      });
    }

    return NextResponse.json(
      fail("INTERNAL_ERROR", "알 수 없는 오류가 발생했습니다.", requestId),
      { status: 500 },
    );
  }
}
