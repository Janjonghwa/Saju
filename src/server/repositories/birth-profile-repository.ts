import { prisma } from "@/lib/prisma";
import type { BirthInput } from "@/types/saju";

export const createBirthProfile = async (userId: string, input: BirthInput) =>
  prisma.birthProfile.create({
    data: {
      userId,
      calendarType: input.calendarType,
      isLeapMonth: input.isLeapMonth,
      birthDate: input.birthDate,
      birthTime: input.birthTime,
      gender: input.gender,
      timezone: input.timezone,
    },
  });

export const findBirthProfileById = async (id: string) =>
  prisma.birthProfile.findUnique({ where: { id } });
