import type { ApiErrorCode } from "@/lib/api";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: ApiErrorCode,
    public readonly status = 500,
  ) {
    super(message);
    this.name = "AppError";
  }
}
