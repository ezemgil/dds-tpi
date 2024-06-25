import { createLogger, format, transports } from "winston";

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.simple(),
    format.printf((info) => {
      return `${info.timestamp} - ${info.level}: ${info.message}`;
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

function log(level, user, uri, resource, message) {
  const messageToLog = `${user} | ${uri} | ${resource} ${message}`;
  switch (level) {
    case 1:
      logger.info(messageToLog);
      break;
    case 2:
      logger.warn(messageToLog);
      break;
    case 3:
      logger.error(messageToLog);
      break;
    default:
      logger.info(messageToLog);
      break;
  }
}

export { log };
