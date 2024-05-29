import express from "express";
import { createLogger, format, transports } from "winston";

export const logger = createLogger({
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
      filename: "./logs/logs.log",
    }),
  ],
});
