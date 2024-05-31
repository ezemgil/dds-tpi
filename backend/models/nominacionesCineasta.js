import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const NominacionCineasta = sequelize.define(
    'NominacionCineasta',
    {
        id_academia: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        id_premio:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        id_pelicula: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        id_cineasta: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        id_rol: {
            type: DataTypes.INTEGER,
            
            primaryKey: true
        },
        fecha_nominacion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fue_ganador: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'NominacionesCineasta',
        timestamps: false
    }
);

export default NominacionCineasta;