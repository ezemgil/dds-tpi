import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Pais from "./pais.js";

const Cineasta = sequelize.define(
    "Cineasta",
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        apellido:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        fecha_nacimiento:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        nacionalidad:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Pais,
                key: "id",
            },
        },
        nacionalidad2:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Pais,
                key: "id",
            },
        },

    },
    {
        tableName: "Cineastas",
        timestamps: false,
    }
);

export default Cineasta;