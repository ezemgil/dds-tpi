import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Pelicula from './peliculas.js';
import Cineasta from './cineastas.js';
import TipoRol from './tiposRol.js';


const PeliculaCineastaRol = sequelize.define(
    'PeliculaCineastaRol',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_pelicula:{
            type: DataTypes.INTEGER,
            references: {
                model: Pelicula,
                key: 'id'
            }
        },
        id_cineasta:{
            type: DataTypes.INTEGER,
            references: {
                model: Cineasta,
                key: 'id'
            }
        },
        id_rol:{
            type: DataTypes.INTEGER,
            references: {
                model: TipoRol,
                key: 'id'
            }
        }
    },
    {
        tableName: 'PeliculaCineastaRol',
        timestamps: false,
    }
)

export default PeliculaCineastaRol;