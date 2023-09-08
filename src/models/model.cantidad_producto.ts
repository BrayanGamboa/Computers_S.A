import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.postgres";

export const cantidadProducto = sequelize.define('cantidad_producto',{
    id_producto: {
        type: DataTypes.INTEGER,
    },
    cantidad: {
        type: DataTypes.INTEGER,
    },
    id_pedido: {
        type: DataTypes.INTEGER,
    },
});