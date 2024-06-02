import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Pelicula from "./peliculas.js";
import Idioma from "./idiomas.js";
import TipoTraduccion from "./tipos_traduccion.js";

const IdiomaPelicula = sequelize.define(
    'IdiomaPelicula', {
        id_pelicula: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Pelicula,
                key: 'id'
            }
        },
        id_idioma: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Idioma,
                key: 'id'
            }
        },
        id_tipo_traduccion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: TipoTraduccion,
                key: 'id'
            }
        }
    },
    {
        tableName: 'IdiomasPelicula',
        timestamps: false,
    
    }
);

export default IdiomaPelicula;