require("dotenv").config();

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT) || 5000,

  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "rating_app",
  DB_DIALECT: process.env.DB_DIALECT || "mysql",

  JWT_SECRET: process.env.JWT_SECRET || "supersecretjwtkey",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "superrefreshsecret",

  TOKEN_EXPIRE: process.env.TOKEN_EXPIRE || "15m",
  REFRESH_EXPIRE: process.env.REFRESH_EXPIRE || "7d",

  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};

module.exports = env;
