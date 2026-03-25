type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export const RATE_LIMIT_ANONYMOUS = 30;
export const RATE_LIMIT_AUTHENTICATED = 100;
export const RATE_LIMIT_WINDOW_MS = 60_000;

export const getRateLimitKey = (userId: string | null, ip: string): string =>
  userId ?? ip;

export const checkRateLimit = (
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; remaining: number; resetAt: number } => {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetAt });

    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      resetAt,
    };
  }

  const nextCount = current.count + 1;
  rateLimitStore.set(key, { count: nextCount, resetAt: current.resetAt });

  const allowed = nextCount <= limit;
  const remaining = allowed ? Math.max(0, limit - nextCount) : 0;

  return {
    allowed,
    remaining,
    resetAt: current.resetAt,
  };
};
