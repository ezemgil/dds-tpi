import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import Pelicula from "./peliculas.js";
import Premio from "./premios.js";

const NominacionPelicula = sequelize.define(
  "NominacionPelicula",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_premio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Premio,
        key: "id",
      },
    },
    id_pelicula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pelicula,
        key: "id",
      },
    },
    fecha_nominacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fue_ganador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[0, 1]],
      },
      defaultValue: 0,
    },
  },
  {
    tableName: "NominacionesPelicula",
    timestamps: false,
  }
);

export default NominacionPelicula;
