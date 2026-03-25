import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// Conditionally wrap with Sentry if available
let config = nextConfig;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const withSentry = require("@sentry/nextjs").withSentryConfig;
  if (typeof withSentry === "function") {
    config = withSentry(nextConfig, {
      // Sentry options
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      // Only print logs for uploading source maps in CI
      silent: !process.env.CI,
      widenClientFileUpload: true,
      reactRoot: true,
    });
  }
} catch {
  // @sentry/nextjs not installed, continue without Sentry
}

export default config;
