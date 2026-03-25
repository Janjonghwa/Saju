import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { createRequestId, fail, ok } from "@/lib/api";
import { AppError } from "@/lib/auth-errors";
import { createLogger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

const profileUpdateSchema = z.object({
  name: z.string().trim().min(1).max(50),
});

const isPrismaNotFoundError = (error: unknown) => {
  if (!error || typeof error !== "object") {
    return false;
  }

  const maybeCode = (error as { code?: unknown }).code;
  return maybeCode === "P2025";
};

export async function GET() {
  const requestId = createRequestId();
  const logger = createLogger(requestId);

  try {
    logger.info("profile request received", { method: "GET", path: "/api/profile" });

    const session = await auth();

    if (!session?.user?.id) {
      logger.warn("profile unauthorized access", { path: "/api/profile" });

      return NextResponse.json(
        fail("UNAUTHORIZED", "로그인이 필요합니다.", requestId),
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AppError("사용자 정보를 찾을 수 없습니다.", "UNAUTHORIZED", 401);
    }

    logger.info("profile fetched", { userId: session.user.id });

    return NextResponse.json(ok(user, requestId));
  } catch (error) {
    logger.error("profile request failed", {
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

export async function PATCH(request: Request) {
  const requestId = createRequestId();
  const logger = createLogger(requestId);

  try {
    logger.info("profile update request received", {
      method: "PATCH",
      path: "/api/profile",
    });

    const session = await auth();

    if (!session?.user?.id) {
      logger.warn("profile update unauthorized access", { path: "/api/profile" });

      return NextResponse.json(
        fail("UNAUTHORIZED", "로그인이 필요합니다.", requestId),
        { status: 401 },
      );
    }

    const payload = await request.json();
    const input = profileUpdateSchema.parse(payload);

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name: input.name },
      select: {
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });

    logger.info("profile updated", { userId: session.user.id });

    return NextResponse.json(ok(updatedUser, requestId));
  } catch (error) {
    logger.error("profile update failed", {
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

    if (isPrismaNotFoundError(error)) {
      return NextResponse.json(
        fail("UNAUTHORIZED", "사용자 정보를 찾을 수 없습니다.", requestId),
        { status: 401 },
      );
    }

    return NextResponse.json(
      fail("INTERNAL_ERROR", "알 수 없는 오류가 발생했습니다.", requestId),
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const requestId = createRequestId();
  const logger = createLogger(requestId);

  try {
    logger.info("account delete request received", {
      method: "DELETE",
      path: "/api/profile",
    });

    const session = await auth();

    if (!session?.user?.id) {
      logger.warn("account delete unauthorized access", { path: "/api/profile" });

      return NextResponse.json(
        fail("UNAUTHORIZED", "로그인이 필요합니다.", requestId),
        { status: 401 },
      );
    }

    await prisma.user.delete({
      where: { id: session.user.id },
    });

    logger.info("account deleted", { userId: session.user.id });

    return NextResponse.json(
      ok(
        {
          deleted: true,
        },
        requestId,
      ),
    );
  } catch (error) {
    logger.error("account delete failed", {
      message: error instanceof Error ? error.message : "unknown error",
      name: error instanceof Error ? error.name : "unknown",
    });

    if (error instanceof AppError) {
      return NextResponse.json(fail(error.code, error.message, requestId), {
        status: error.status,
      });
    }

    if (isPrismaNotFoundError(error)) {
      return NextResponse.json(
        fail("UNAUTHORIZED", "사용자 정보를 찾을 수 없습니다.", requestId),
        { status: 401 },
      );
    }

    return NextResponse.json(
      fail("INTERNAL_ERROR", "알 수 없는 오류가 발생했습니다.", requestId),
      { status: 500 },
    );
  }
}
