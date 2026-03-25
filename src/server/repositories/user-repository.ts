import { prisma } from "@/lib/prisma";
import type { UserRole } from "@prisma/client";

export const findUserRole = async (userId: string): Promise<UserRole | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role ?? null;
};
