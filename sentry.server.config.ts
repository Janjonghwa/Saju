// Server-side Sentry initialization
// Only runs if @sentry/nextjs is installed

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Sentry = require("@sentry/nextjs");

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
  });
} catch {
  // @sentry/nextjs not installed, skip initialization
}
