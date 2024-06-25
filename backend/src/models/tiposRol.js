import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const TipoRol = sequelize.define(
  "TipoRol",
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
    tableName: "TiposRol",
    timestamps: false,
  }
);

export default TipoRol;
