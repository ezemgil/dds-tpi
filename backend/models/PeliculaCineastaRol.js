import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Pelicula from './peliculas.js';
import Cineasta from './cineastas.js';
import TipoRol from './tiposRol.js';


const PeliculaCineastaRol = sequelize.define(
    'PeliculaCineastaRol',
    {
        id_pelicula:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Pelicula,
                key: 'id'
            }
        },
        id_cineasta:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Cineasta,
                key: 'id'
            
            }
        },
        id_rol:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: TipoRol,
                key: 'id'
            }
        }
    },
    {
        tableName: 'PeliculaCineastaRoles',
        timestamps: false,
    }
)

export default PeliculaCineastaRol;