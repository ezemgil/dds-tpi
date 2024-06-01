import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Academia from "./academias.js";
import Premio from "./premios.js";
import Pelicula from "./peliculas.js";


const NominacionPelicula = sequelize.define(
    "NominacionPelicula",
    {
        id_academia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Academia,
            key: "id",
        },
        },
        id_premio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Premio,
                key: "id",
        },
        },
        id_pelicula: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { 
            model: Pelicula,
            key: "id",
        },
        },
        fecha_nominacion: {
        type: DataTypes.DATE,
        primaryKey: true,
        },
        fue_ganador: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        tableName: "NominacionesPelicula",
        timestamps: false,
    }
    );

export default NominacionPelicula;