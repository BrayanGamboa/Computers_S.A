import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.postgres";

export const direccion = sequelize.define('direccion',{
    tipo_via: {
        type: DataTypes.STRING
    },
    numero_via: {
        type: DataTypes.INTEGER
    },
    letra_via: {
        type: DataTypes.STRING
    },
    numero_cuadra: {
        type: DataTypes.INTEGER
    },
    numero_casa: {
        type: DataTypes.INTEGER
    },
    datos_extra: {
        type: DataTypes.STRING
    },
    numero_extra: {
        type: DataTypes.INTEGER
    }
});