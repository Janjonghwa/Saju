import { describe, expect, it } from "vitest";

import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit";

describe("rate-limit helpers", () => {
  it("allows requests within limit", () => {
    const key = `within-limit-${Date.now()}`;

    const first = checkRateLimit(key, 2, 60_000);
    const second = checkRateLimit(key, 2, 60_000);

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(second.remaining).toBe(0);
  });

  it("blocks requests when limit is exceeded", () => {
    const key = `exceed-limit-${Date.now()}`;

    checkRateLimit(key, 1, 60_000);
    const exceeded = checkRateLimit(key, 1, 60_000);

    expect(exceeded.allowed).toBe(false);
    expect(exceeded.remaining).toBe(0);
  });

  it("returns userId when userId exists", () => {
    expect(getRateLimitKey("user-123", "127.0.0.1")).toBe("user-123");
  });

  it("returns IP when userId is missing", () => {
    expect(getRateLimitKey(null, "127.0.0.1")).toBe("127.0.0.1");
  });
});
