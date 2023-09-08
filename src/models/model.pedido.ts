import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.postgres";

export const pedidos = sequelize.define('pedido', {
    id_pedido: {
        type: DataTypes.INTEGER
    },
    id_direccion: {
        type: DataTypes.INTEGER,
    },
    estado: {
        type: DataTypes.STRING,
    }
});