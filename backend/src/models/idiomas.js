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
  },
  {
    tableName: "Idiomas",
    timestamps: false,
  }
);

export default Idioma;
