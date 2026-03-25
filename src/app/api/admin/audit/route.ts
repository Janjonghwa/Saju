import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { createRequestId, fail, ok } from "@/lib/api";
import { AppError } from "@/lib/auth-errors";
import { createLogger } from "@/lib/logger";
import { findAuditLogs } from "@/server/repositories/audit-log-repository";

export async function GET(request: Request) {
  const requestId = createRequestId();
  const logger = createLogger(requestId);

  try {
    logger.info("admin audit list request received", {
      method: "GET",
      path: "/api/admin/audit",
    });

    const session = await auth();

    if (!session?.user?.id) {
      logger.warn("admin audit unauthorized access", { path: "/api/admin/audit" });

      return NextResponse.json(
        fail("UNAUTHORIZED", "로그인이 필요합니다.", requestId),
        { status: 401 },
      );
    }

    if (session.user.role !== "admin") {
      logger.warn("admin audit forbidden access", {
        path: "/api/admin/audit",
        userId: session.user.id,
        role: session.user.role,
      });

      return NextResponse.json(
        fail("FORBIDDEN", "관리자만 접근할 수 있습니다.", requestId),
        { status: 403 },
      );
    }

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId") ?? undefined;
    const entityType = url.searchParams.get("entityType") ?? undefined;
    const entityId = url.searchParams.get("entityId") ?? undefined;
    const actionParam = url.searchParams.get("action");
    const action =
      actionParam === "CREATE" ||
      actionParam === "UPDATE" ||
      actionParam === "DELETE"
        ? actionParam
        : undefined;
    const takeParam = url.searchParams.get("take");
    const skipParam = url.searchParams.get("skip");
    const take = takeParam ? Number.parseInt(takeParam, 10) : undefined;
    const skip = skipParam ? Number.parseInt(skipParam, 10) : undefined;

    if (actionParam && !action) {
      return NextResponse.json(
        fail("INVALID_INPUT", "action은 CREATE/UPDATE/DELETE만 가능합니다.", requestId),
        { status: 400 },
      );
    }

    if (
      (takeParam && (Number.isNaN(take) || (take ?? 0) < 0)) ||
      (skipParam && (Number.isNaN(skip) || (skip ?? 0) < 0))
    ) {
      return NextResponse.json(
        fail("INVALID_INPUT", "take/skip은 0 이상의 숫자여야 합니다.", requestId),
        { status: 400 },
      );
    }

    if (take !== undefined && take > 100) {
      return NextResponse.json(
        fail("INVALID_INPUT", "take는 100 이하여야 합니다.", requestId),
        { status: 400 },
      );
    }

    const logs = await findAuditLogs({
      userId,
      entityType,
      entityId,
      action,
      take,
      skip,
    });

    logger.info("admin audit logs fetched", {
      userId: session.user.id,
      count: logs.length,
    });

    return NextResponse.json(ok({ logs }, requestId));
  } catch (error) {
    logger.error("admin audit list failed", {
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
