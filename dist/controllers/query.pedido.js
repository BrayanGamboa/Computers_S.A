"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelarPedido = exports.PostPedido = exports.GetPedido = void 0;
const connection_postgres_1 = require("../database/connection.postgres");
const schemasjoi_pedido_1 = require("../validation/schemasjoi.pedido");
const GetPedido = async (req, h) => {
    let client = await connection_postgres_1.pool.connect();
    try {
        const result = await client.query("SELECT * FROM pedido;");
        if (result.rowCount != 0) {
            return h.response(result.rows).code(200);
        }
        else {
            return h.response("Sin datos").code(204);
        }
    }
    catch (error) {
        return h.response(error).code(400);
    }
    finally {
        client.release(true);
    }
};
exports.GetPedido = GetPedido;
const PostPedido = async (req, h) => {
    const { payload } = req;
    const { error } = schemasjoi_pedido_1.validacionPedido.validate(payload);
    if (error) {
        return h.response(error.message).code(409);
    }
    else {
        let client = await connection_postgres_1.pool.connect();
        let query = "";
        let queryValidacion = "";
        try {
            const { id_direccion, estado } = req.payload;
            query = `INSERT INTO pedido (id_direccion, estado) VALUES (${id_direccion}, '${estado}');`;
            queryValidacion = `SELECT * FROM pedido WHERE id_direccion = ${id_direccion};`;
            let result = await client.query(queryValidacion);
            if (result.rowCount <= 2) {
                result = await client.query(query);
                return h.response("Pedido guardado con exito").code(200);
            }
            else {
                return h.response("No se puee realizar la acción, ya se tiene 2 pedido registrado a la dirección solicitada").code(401);
            }
        }
        catch (error) {
            return h.response(error).code(400);
        }
        finally {
            client.release(true);
        }
    }
};
exports.PostPedido = PostPedido;
const CancelarPedido = async (req, h) => {
    const { params } = req;
    const { error } = schemasjoi_pedido_1.validacionId.validate(params);
    if (error) {
        return h.response(error.message).code(409);
    }
    else {
        let client = await connection_postgres_1.pool.connect();
        let id_pedido = req.params.id_pedido;
        let indicador = 0;
        try {
            let result = await client.query(`SELECT * FROM pedido WHERE id_pedido = ${id_pedido};`);
            result.rows.forEach(pedido => {
                if (pedido.estado == "Realizado" || pedido.estado == "En Bodega") {
                    indicador = 1;
                }
            });
            if (indicador != 0) {
                result = await client.query(`UPDATE pedido SET estado = 'Cancelado' WHERE id_pedido = ${id_pedido};`);
                return h.response("Se canceló el pedido satisfactoriamente").code(200);
            }
            return h.response("No se puede cancelar, porque no cumple con los requisitos").code(401);
        }
        catch (error) {
            return h.response(error).code(400);
        }
        finally {
            client.release(true);
        }
    }
};
exports.CancelarPedido = CancelarPedido;
