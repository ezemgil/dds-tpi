import { createLogger, format, transports } from "winston";

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    format.printf((info) => {
      return `${info.level.toUpperCase()} | ${info.timestamp} | ${
        info.message
      }`;
    })
  ),
  transports: [
    new transports.Console({ level: "debug" }),
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: "logs/logs.log",
    }),
  ],
});

const log = (req, resource) => {
  const message = `Ip: ${req.ip} | Method: ${req.method} | User-agent: ${req.headers["user-agent"]} | Resource: ${resource}`;
  logger.info(message);
};

const logError = (req, resource, error) => {
  const message = `Ip: ${req.ip} | Method: ${req.method} | User-agent: ${req.headers["user-agent"]} | Resource: ${resource} | Error: ${error.message}`;
  logger.error(message);
};

export { logger, log, logError };
