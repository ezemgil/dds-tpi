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
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "Clasificaciones",
    timestamps: false,
  }
);

export default Clasificacion;
