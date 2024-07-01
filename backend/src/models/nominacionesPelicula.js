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
            defaultValue: 0,
            onDelete: "SET DEFAULT",
        },
        id_pelicula: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Pelicula,
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        fecha_nominacion: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isBeforeToday(value) {
                    if (new Date(value) > new Date()) {
                        throw new Error("fecha_nominacion debe ser una fecha anterior a hoy.");
                    }
                },
            },
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
        indexes: [
            {
                unique: true,
                fields: ["id_premio", "id_pelicula", "fecha_nominacion"],
            },
        ],
    }
);

export default NominacionPelicula;
