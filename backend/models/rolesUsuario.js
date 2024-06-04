import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const RolUsuario = sequelize.define(
  "RolUsuario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "RolesUsuario",
    timestamps: false,
  }
);

export default RolUsuario;
