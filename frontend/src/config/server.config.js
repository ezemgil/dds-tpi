import dotenv from "dotenv";
dotenv.config();

const SERVER_CONFIG = {
  SERVER_URL: process.env.SERVER_URL,
  PORT: process.env.PORT,
  SERVER_API_URL: `${SERVER_URL}:${PORT}/api`,
};

export default SERVER_CONFIG;
