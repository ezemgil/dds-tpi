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
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                min: 0,
                max: 10,
            },
        },
        duracion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
            },
        },
        fecha_estreno: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            validate: {
                isBeforeToday(value) {
                    if (new Date(value) > new Date()) {
                        throw new Error("fecha_estreno debe ser una fecha anterior a hoy.");
                    }
                },
            },
        },
        titulo_original: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
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
        indexes: [
            {
                unique: true,
                fields: ["titulo", "fecha_estreno"],
            },
        ],
    }
);

export default Pelicula;
