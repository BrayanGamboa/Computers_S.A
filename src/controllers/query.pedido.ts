import { Request, ResponseToolkit } from "@hapi/hapi";
import { pool } from "../database/connection.postgres";
import { QueryResult } from "pg";
import { validacionPedido, validacionPedidoId } from "../validation/schemasjoi.pedido";


export const GetPedido = async (req: Request, h: ResponseToolkit) => {
    let client = await pool.connect();
    try {
        const result: QueryResult = await client.query("SELECT * FROM pedido;");

        if (result.rowCount != 0) {
            return h.response(result.rows);
        } else {
            return h.response([{ message: "Sin datos" }]).code(204);
        }
    } catch (error: any) {
        return h.response({ error: error }).code(400);
    } finally {
        client.release(true);
    }
};


export const PostPedido = async (req: Request, h: ResponseToolkit) => {
    const { payload } = req;
    const { error } = validacionPedido.validate(payload);
    if (error) {
        return h.response({ error: error.message }).code(409);

    } else {
        let client = await pool.connect();
        let query = "";
        let queryValidacion = "";
        try {
            const { id_direccion, estado }: any = req.payload;
            query = `INSERT INTO pedido (id_direccion, estado) VALUES (${id_direccion}, '${estado}');`
            queryValidacion = `SELECT * FROM pedido WHERE id_direccion = ${id_direccion};`;

            let result: QueryResult = await client.query(queryValidacion);
            if (result.rowCount <= 2) {
                result = await client.query(query);
                return h.response({ message: "Pedido guardado con exito" }).code(200);
            } else {
                return h.response({ message: "No se puee realizar la acción, ya se tiene 2 pedido registrado a la dirección solicitada" }).code(401);
            }
        } catch (error: any) {
            return h.response({ error: error }).code(400);
        } finally {
            client.release(true);
        }
    }
};


export const CancelarPedido = async (req: Request, h: ResponseToolkit) => {
    const { params } = req;
    const { error } = validacionPedidoId.validate(params);
    if (error) {
        return h.response({ error: error.message }).code(409);
    }
    else {
        let client = await pool.connect();
        let id_pedido = req.params.id_pedido;
        let indicador = 0;

        try {
            let result: QueryResult = await client.query(`SELECT * FROM pedido WHERE id_pedido = ${id_pedido};`);
            result.rows.forEach(pedido => {
                if (pedido.estado == "Realizado" || pedido.estado == "En Bodega") {
                    indicador = 1;
                }
            });
            if (indicador != 0) {
                result = await client.query(`UPDATE pedido SET estado = 'Cancelado' WHERE id_pedido = ${id_pedido};`);
                return h.response({ message: "Se canceló el pedido satisfactoriamente" }).code(200);
            }
            return h.response({ message: "No se puede cancelar, porque no cumple con los requisitos" }).code(401);
        } catch (error: any) {
            return h.response({ error: error }).code(400);
        } finally {
            client.release(true);
        }
    }
};