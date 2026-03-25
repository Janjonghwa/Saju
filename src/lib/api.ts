export type ApiErrorCode =
  | "INVALID_INPUT"
  | "INVALID_CALENDAR_TYPE"
  | "INVALID_BIRTH_DATE"
  | "INVALID_BIRTH_TIME"
  | "UNSUPPORTED_TIMEZONE"
  | "CHART_CALCULATION_FAILED"
  | "REPORT_GENERATION_FAILED"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";

export type ApiSuccess<T> = {
  success: true;
  data: T;
  requestId: string;
};

export type ApiFailure = {
  success: false;
  errorCode: ApiErrorCode;
  message: string;
  requestId: string;
  retryable?: boolean;
  details?: Record<string, unknown>;
};

export const createRequestId = () => crypto.randomUUID();

export const ok = <T>(data: T, requestId: string): ApiSuccess<T> => ({
  success: true,
  data,
  requestId,
});

export const fail = (
  errorCode: ApiErrorCode,
  message: string,
  requestId: string,
  details?: Record<string, unknown>,
  retryable = false,
): ApiFailure => ({
  success: false,
  errorCode,
  message,
  requestId,
  retryable,
  details,
});
