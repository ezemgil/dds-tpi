import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Academia from "./academias.js";
import Premio from "./premios.js";
import Pelicula from "./peliculas.js";


const NominacionPelicula = sequelize.define(
    "NominacionPelicula",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_academia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Academia,
            key: "id",
        },
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
            type: DataTypes.DATE,
            allowNull: false,
        },
        fue_ganador: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[0, 1]],
            }
        }
    },
    {
        tableName: "NominacionesPelicula",
        timestamps: false,
    }
    );

export default NominacionPelicula;