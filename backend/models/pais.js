import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Pais = sequelize.define(
    "Pais",
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
        codigo:{
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        tableName: "Paises",
        timestamps: false,
    }
)

export default Pais;