import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Idioma = sequelize.define(
  "Idioma",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
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
    tableName: "Idiomas",
    timestamps: false,
  }
);

export default Idioma;
