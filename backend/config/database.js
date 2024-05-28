import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Crear una instancia de Sequelize
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_NAME,
});

export default sequelize;
