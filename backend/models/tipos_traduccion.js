import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TipoTraduccion = sequelize.define(
    "TipoTraduccion",
    {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "TiposTraduccion",
        timestamps: false,
    }
);

export default TipoTraduccion;