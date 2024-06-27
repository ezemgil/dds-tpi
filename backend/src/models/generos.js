import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Genero = sequelize.define(
  "Genero",
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
    tableName: "Generos",
    timestamps: false,
  }
);

export default Genero;
