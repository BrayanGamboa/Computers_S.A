import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.postgres";

export const producto = sequelize.define('producto',{
    nombre: {
        type: DataTypes.STRING
    }, 
    descripcion: {
        type: DataTypes.STRING
    }, 
    cantidad: {
        type: DataTypes.INTEGER
    }
});