import { prisma } from "@/lib/prisma";

type CreatePaymentParams = {
  userId: string;
  orderId: string;
  amount: number;
  provider: string;
  productName: string;
};

export const createPayment = async (params: CreatePaymentParams) =>
  prisma.payment.create({
    data: {
      userId: params.userId,
      orderId: params.orderId,
      amount: params.amount,
      provider: params.provider,
      productName: params.productName,
    },
  });

export const findPaymentsByUserId = async (userId: string) =>
  prisma.payment.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
