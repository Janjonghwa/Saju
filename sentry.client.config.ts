// Client-side Sentry initialization
// Only runs if @sentry/nextjs is installed

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Sentry = require("@sentry/nextjs");

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    // Capture Replay for 10% of all sessions plus 100% of sessions with error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
} catch {
  // @sentry/nextjs not installed, skip initialization
}
