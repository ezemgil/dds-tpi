import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "sqlite",
  storage: process.env.DATABASE_URL,
});

export default sequelize;
