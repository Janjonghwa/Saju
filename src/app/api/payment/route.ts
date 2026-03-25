import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { createRequestId, fail, ok } from "@/lib/api";
import { AppError } from "@/lib/auth-errors";
import { createLogger } from "@/lib/logger";
import {
  createPayment,
  findPaymentsByUserId,
} from "@/server/repositories/payment-repository";

const paymentCreateSchema = z.object({
  orderId: z.string().trim().min(1),
  amount: z.number().int().positive(),
  productName: z.string().trim().min(1),
});

const PAYMENT_PROVIDER_STUB = "toss";

export async function POST(request: Request) {
  const requestId = createRequestId();
  const logger = createLogger(requestId);

  try {
    logger.info("payment create request received", {
      method: "POST",
      path: "/api/payment",
    });

    const session = await auth();

    if (!session?.user?.id) {
      logger.warn("payment create unauthorized access", { path: "/api/payment" });

      return NextResponse.json(
        fail("UNAUTHORIZED", "로그인이 필요합니다.", requestId),
        { status: 401 },
      );
    }

    const payload = await request.json();
    const input = paymentCreateSchema.parse(payload);
    const payment = await createPayment({
      userId: session.user.id,
      orderId: input.orderId,
      amount: input.amount,
      provider: PAYMENT_PROVIDER_STUB,
      productName: input.productName,
    });

    logger.info("payment created", {
      userId: session.user.id,
      paymentId: payment.id,
      orderId: payment.orderId,
    });

    return NextResponse.json(ok(payment, requestId), { status: 201 });
  } catch (error) {
    logger.error("payment create failed", {
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

export async function GET() {
  const requestId = createRequestId();
  const logger = createLogger(requestId);

  try {
    logger.info("payment list request received", {
      method: "GET",
      path: "/api/payment",
    });

    const session = await auth();

    if (!session?.user?.id) {
      logger.warn("payment list unauthorized access", { path: "/api/payment" });

      return NextResponse.json(
        fail("UNAUTHORIZED", "로그인이 필요합니다.", requestId),
        { status: 401 },
      );
    }

    const payments = await findPaymentsByUserId(session.user.id);

    logger.info("payment list fetched", {
      userId: session.user.id,
      count: payments.length,
    });

    return NextResponse.json(ok({ payments }, requestId));
  } catch (error) {
    logger.error("payment list failed", {
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
