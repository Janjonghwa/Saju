import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST() {
  const prisma = new PrismaClient();

  try {
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "User" ("id" TEXT NOT NULL, "name" TEXT, "email" TEXT NOT NULL, "emailVerified" TIMESTAMP(3), "image" TEXT, "role" TEXT NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "User_pkey" PRIMARY KEY ("id"))`;
    await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`;
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "Account" ("userId" TEXT NOT NULL, "type" TEXT NOT NULL, "provider" TEXT NOT NULL, "providerAccountId" TEXT NOT NULL, "refresh_token" TEXT, "access_token" TEXT, "expires_at" INTEGER, "token_type" TEXT, "scope" TEXT, "id_token" TEXT, "session_state" TEXT, CONSTRAINT "Account_pkey" PRIMARY KEY ("provider", "providerAccountId"))`;
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "Session" ("sessionToken" TEXT NOT NULL, "userId" TEXT NOT NULL, "expires" TIMESTAMP(3) NOT NULL, CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionToken"))`;
    await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session"("sessionToken")`;
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "VerificationToken" ("identifier" TEXT NOT NULL, "token" TEXT NOT NULL, "expires" TIMESTAMP(3) NOT NULL, CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier", "token"))`;
    await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken"("token")`;
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "BirthProfile" ("id" TEXT NOT NULL, "userId" TEXT NOT NULL, "calendarType" TEXT NOT NULL, "isLeapMonth" BOOLEAN NOT NULL, "birthDate" TEXT NOT NULL, "birthTime" TEXT NOT NULL, "gender" TEXT NOT NULL, "timezone" TEXT NOT NULL DEFAULT 'Asia/Seoul', "label" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "BirthProfile_pkey" PRIMARY KEY ("id"))`;
    await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "BirthProfile_userId_idx" ON "BirthProfile"("userId")`;
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "Report" ("id" TEXT NOT NULL, "userId" TEXT NOT NULL, "birthProfileId" TEXT NOT NULL, "theme" TEXT NOT NULL, "targetYear" INTEGER, "summary" TEXT NOT NULL, "score" INTEGER, "tags" JSONB NOT NULL, "result" JSONB NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Report_pkey" PRIMARY KEY ("id"))`;
    await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "Report_userId_idx" ON "Report"("userId")`;
    await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "Report_birthProfileId_idx" ON "Report"("birthProfileId")`;
    await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "Report_theme_idx" ON "Report"("theme")`;
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "ReportLog" ("id" TEXT NOT NULL, "reportId" TEXT NOT NULL, "requestPayload" JSONB NOT NULL, "generatedTags" JSONB NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "ReportLog_pkey" PRIMARY KEY ("id"))`;
    await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "ReportLog_reportId_idx" ON "ReportLog"("reportId")`;
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "InterpretationMessage" ("id" TEXT NOT NULL, "theme" TEXT NOT NULL, "category" TEXT NOT NULL, "tag" TEXT NOT NULL, "title" TEXT NOT NULL, "content" TEXT NOT NULL, "priority" INTEGER NOT NULL DEFAULT 0, "isActive" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "InterpretationMessage_pkey" PRIMARY KEY ("id"))`;
    await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "InterpretationMessage_theme_category_tag_priority_idx" ON "InterpretationMessage"("theme", "category", "tag", "priority")`;
    await prisma.$executeRaw`ALTER TABLE "Account" DROP CONSTRAINT IF EXISTS "Account_userId_fkey"`;
    await prisma.$executeRaw`ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`;
    await prisma.$executeRaw`ALTER TABLE "Session" DROP CONSTRAINT IF EXISTS "Session_userId_fkey"`;
    await prisma.$executeRaw`ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`;
    await prisma.$executeRaw`ALTER TABLE "BirthProfile" DROP CONSTRAINT IF EXISTS "BirthProfile_userId_fkey"`;
    await prisma.$executeRaw`ALTER TABLE "BirthProfile" ADD CONSTRAINT "BirthProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`;
    await prisma.$executeRaw`ALTER TABLE "Report" DROP CONSTRAINT IF EXISTS "Report_userId_fkey"`;
    await prisma.$executeRaw`ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`;
    await prisma.$executeRaw`ALTER TABLE "Report" DROP CONSTRAINT IF EXISTS "Report_birthProfileId_fkey"`;
    await prisma.$executeRaw`ALTER TABLE "Report" ADD CONSTRAINT "Report_birthProfileId_fkey" FOREIGN KEY ("birthProfileId") REFERENCES "BirthProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE`;
    await prisma.$executeRaw`ALTER TABLE "ReportLog" DROP CONSTRAINT IF EXISTS "ReportLog_reportId_fkey"`;
    await prisma.$executeRaw`ALTER TABLE "ReportLog" ADD CONSTRAINT "ReportLog_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE`;

    return NextResponse.json({ success: true, message: "Database tables created successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
