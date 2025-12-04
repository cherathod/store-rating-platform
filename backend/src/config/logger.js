
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize, json } = format;
const env = require("./env");
const path = require("path");
require("winston-daily-rotate-file");

// Console log format
const consoleFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

// File log format (JSON)
const fileFormat = combine(timestamp(), json());

// Daily rotate file transport
const dailyRotateTransport = new transports.DailyRotateFile({
  dirname: path.join(__dirname, "../../logs"),
  filename: "%DATE%-app.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "10m",
  maxFiles: "14d",
  level: env.LOG_LEVEL,
});

const logger = createLogger({
  level: env.LOG_LEVEL,

  format: env.NODE_ENV === "production"
    ? fileFormat // JSON in production
    : combine(colorize(), timestamp(), consoleFormat),

  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp(), consoleFormat),
    }),
    dailyRotateTransport
  ],
});

module.exports = logger;
