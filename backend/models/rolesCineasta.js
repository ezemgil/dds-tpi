import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Cineasta from "./cineastas.js";
import TipoRol from "./tiposRol.js";

const RolesCineasta = sequelize.define(
    "RolesCineastas",
    {
        id_cineasta:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Cineasta,
                key: "id",
            }
        },
        id_rol:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: TipoRol,
                key: "id",
            }
        },
    },
    {
        tableName: "RolesCineasta",
        timestamps: false,
    }
);

export default RolesCineasta;