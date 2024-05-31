import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Academia = sequelize.define(
    "Academia",
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
        fecha_fundacion: {
        type: DataTypes.DATE,
        allowNull: false,
        },
    },
    {
        tableName: "Academias",
        timestamps: false,
    }
);

export default Academia;