import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import Clasificacion from "./clasificaciones.js";

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
      allowNull: true,
    },
    calificacion: {
      type: DataTypes.REAL(2, 1),
      allowNull: true,
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_estreno: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    titulo_original: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_clasificacion: {
      type: DataTypes.INTEGER,
      references: {
        model: Clasificacion,
        key: "id",
      },
    },
  },
  {
    tableName: "Peliculas",
    timestamps: false,
  }
);

export default Pelicula;
