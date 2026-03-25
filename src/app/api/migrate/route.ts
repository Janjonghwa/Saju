import { NextResponse } from "next/server";
import { execSync } from "child_process";

export async function POST(request: Request) {
  try {
    const { secret } = await request.json();

    // Simple security check
    if (secret !== process.env.AUTH_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Run Prisma migration
    const result = execSync("npx prisma migrate deploy", {
      cwd: process.cwd(),
      env: process.env,
      encoding: "utf-8",
    });

    return NextResponse.json({
      success: true,
      message: "Migration completed",
      output: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
