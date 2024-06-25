import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Premio = sequelize.define(
  "Premio",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Premios",
    timestamps: false,
  }
);

export default Premio;
