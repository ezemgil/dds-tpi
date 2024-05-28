import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Pelicula = sequelize.define(
  "Pelicula",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    calificacion: {
      type: DataTypes.REAL(2, 1),
    },
    duracion: {
      type: DataTypes.INTEGER,
    },
    fecha_estreno: {
      type: DataTypes.DATE,
    },
    titulo_original: {
      type: DataTypes.TEXT,
    },
    id_clasificacion: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Peliculas",
    timestamps: false,
  }
);

export default Pelicula;
