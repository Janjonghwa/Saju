type LogLevel = "info" | "warn" | "error";

type LogData = Record<string, unknown> | undefined;

const writeLog = (
  level: LogLevel,
  requestId: string,
  message: string,
  data?: LogData,
) => {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    requestId,
    message,
    data,
  };

  console.log(JSON.stringify(payload));
};

export const createLogger = (requestId: string) => ({
  info: (message: string, data?: LogData) => {
    writeLog("info", requestId, message, data);
  },
  warn: (message: string, data?: LogData) => {
    writeLog("warn", requestId, message, data);
  },
  error: (message: string, data?: LogData) => {
    writeLog("error", requestId, message, data);
  },
});
