import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import Paises from "./paises.js";

const Cineasta = sequelize.define(
    "Cineasta",
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
        apellido: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isBeforeToday(value) {
                    if (new Date(value) > new Date()) {
                        throw new Error("fecha_nacimiento debe ser una fecha anterior a hoy.");
                    }
                },
            },
        },
        fecha_fallecimiento: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: {
                isBeforeToday(value) {
                    if (value && new Date(value) > new Date()) {
                        throw new Error("fecha_fallecimiento debe ser una fecha anterior a hoy.");
                    }
                },
                isAfterBirth(value) {
                    if (value && new Date(value) < new Date(this.fecha_nacimiento)) {
                        throw new Error("fecha_fallecimiento debe ser posterior a fecha_nacimiento.");
                    }
                },
            },
        },
        biografia: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        imagen: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        nacionalidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Paises,
                key: "id",
            },
            defaultValue: 0,
            onDelete: "SET DEFAULT",
        },
        nacionalidad2: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Paises,
                key: "id",
            },
            onDelete: "SET NULL",
        },
    },
    {
        tableName: "Cineastas",
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ["nombre", "apellido", "fecha_nacimiento"],
            },
        ],
        validate: {
            nationalitiesDifferent() {
                if (this.nacionalidad && this.nacionalidad2 && this.nacionalidad === this.nacionalidad2) {
                    throw new Error("nacionalidad y nacionalidad2 deben ser diferentes.");
                }
            },
        },
    }
);

export default Cineasta;
