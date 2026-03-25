import type { AuditLog, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type CreateAuditLogParams = {
  userId: string;
  action: "CREATE" | "UPDATE" | "DELETE";
  entityType: "InterpretationMessage";
  entityId: string;
  beforeValue?: Prisma.InputJsonValue;
  afterValue?: Prisma.InputJsonValue;
};

export type FindAuditLogsFilters = {
  userId?: string;
  entityType?: string;
  entityId?: string;
  action?: "CREATE" | "UPDATE" | "DELETE";
  take?: number;
  skip?: number;
};

export const createAuditLog = async (
  params: CreateAuditLogParams,
): Promise<AuditLog> =>
  prisma.auditLog.create({
    data: {
      userId: params.userId,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      beforeValue: params.beforeValue,
      afterValue: params.afterValue,
    },
  });

export const findAuditLogs = async (
  filters: FindAuditLogsFilters = {},
): Promise<AuditLog[]> =>
  prisma.auditLog.findMany({
    where: {
      userId: filters.userId,
      entityType: filters.entityType,
      entityId: filters.entityId,
      action: filters.action,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: filters.take,
    skip: filters.skip,
  });
