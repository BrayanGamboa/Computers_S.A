import { Request, ResponseToolkit } from "@hapi/hapi";
import { pool } from "../database/connection.postgres"
import { QueryResult } from "pg";
import { json } from "sequelize";
import { Json } from "hapi";
import { validacionCantidadProducto } from "../validation/schemasjoi.cantidad_producto";

export const GetCantidadProducto = async (req: Request, h: ResponseToolkit) => {
    let client = await pool.connect();
    try {
        const result: QueryResult = await client.query("SELECT * FROM cantidad_producto;");

        if (result.rowCount != 0) {
            return h.response(result.rows).code(200);
        } else {
            return h.response("Sin datos").code(204);
        }
    } catch (error: any) {
        return h.response("Error interno").code(400);
    } finally {
        client.release(true);
    }
};

export const PostCantidadProducto = async (req: Request, h: ResponseToolkit) => {
    const { payload } = req;
    const { error } = validacionCantidadProducto.validate(payload);
    if (error) {
        return h.response(error.message).code(409);
    }
    else {
        let client = await pool.connect();
        let queryCrear = "";
        let queryConsulta = "";
        let queryActualizarCantidad = "";
        let queryValidar = "";
        try {
            const { id_pedido,cantidad, id_producto }:any = req.payload;
            queryCrear = `INSERT INTO cantidad_producto (id_producto, cantidad, id_pedido) VALUES (${id_producto}, ${cantidad}, ${id_pedido});`
            queryConsulta = `SELECT * FROM producto WHERE id_producto = ${id_producto};`;
            queryValidar = `SELECT * FROM cantidad_producto WHERE id_pedido = ${id_pedido};`;

            //Validamos la cantidad de productos que se han agregado al pedido
            let result: QueryResult = await client.query(queryValidar);

            if (result.rowCount <= 5) {
                //Validaremos que si se tengan la cantidades requeridas por el usuario
                result = await client.query(queryConsulta);
                if (result.rows[0].cantidad < cantidad) {
                    return h.response(`No se tienen la cantidad de articulos solicitados para el producto ${result.rows[0].nombre}`).code(406);
                } else {
                    //Actualizamos la cantidades que se tienen del producto actualmente
                    queryActualizarCantidad = `UPDATE producto SET cantidad=${result.rows[0].cantidad - cantidad} WHERE id_producto=${id_producto}`;
                    result = await client.query(queryActualizarCantidad);

                    //Creamos la nueva cantidad del producto
                    result = await client.query(queryCrear);

                    return h.response("Cantidad de producto guardada con exito").code(200);
                }
            } else {
                return h.response(`No se pueden agregar más productos al pedido con id: ${id_pedido}`).code(401);
            }
        } catch (error: any) {
            return h.response(error).code(400);
        } finally {
            client.release(true);
        }
    }
};

