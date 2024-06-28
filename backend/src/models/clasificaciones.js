import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Clasificacion = sequelize.define(
  "Clasificacion",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    activo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[0, 1]],
      },
      defaultValue: 0,
    },
  },
  {
    tableName: "Clasificaciones",
    timestamps: false,
  }
);

export default Clasificacion;
