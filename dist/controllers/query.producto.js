"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostProducto = exports.GetProductos = void 0;
const connection_postgres_1 = require("../database/connection.postgres");
const schemasjoi_producto_1 = require("../validation/schemasjoi.producto");
const GetProductos = async (req, h) => {
    let client = await connection_postgres_1.pool.connect();
    try {
        const result = await client.query("SELECT * FROM producto;");
        if (result.rowCount != 0) {
            return h.response(result.rows).code(200);
        }
        else {
            return h.response("Sin datos").code(204);
        }
    }
    catch (error) {
        return h.response("Error interno").code(500);
    }
    finally {
        client.release(true);
    }
};
exports.GetProductos = GetProductos;
const PostProducto = async (req, h) => {
    const { payload } = req;
    const { error } = schemasjoi_producto_1.validacionProducto.validate(payload);
    if (error) {
        return h.response(error.message).code(400);
    }
    else {
        let client = await connection_postgres_1.pool.connect();
        try {
            const { nombre, descripcion, cantidad } = req.payload;
            let query = `INSERT INTO producto (nombre, descripcion, cantidad) VALUES ('${nombre}', '${descripcion}', ${cantidad});`;
            const result = await client.query(query);
            return h.response("Producto guardado con exito").code(200);
        }
        catch (error) {
            return h.response(`Producto ya se encuentra registrado. ${error}`).code(400);
        }
        finally {
            client.release(true);
        }
    }
};
exports.PostProducto = PostProducto;
