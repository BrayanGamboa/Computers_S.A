"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDireccion = exports.PostDireccionExtra = exports.GetDireccion = void 0;
const connection_postgres_1 = require("../database/connection.postgres");
const schemasjoi_direccion_1 = require("../validation/schemasjoi.direccion");
const GetDireccion = async (req, h) => {
    let client = await connection_postgres_1.pool.connect();
    try {
        const result = await client.query("SELECT * FROM direccion;");
        if (result.rowCount != 0) {
            return h.response(result.rows).code(200);
        }
        else {
            return h.response("Sin datos").code(204);
        }
    }
    catch (error) {
        return h.response("Error interno").code(400);
    }
    finally {
        client.release(true);
    }
};
exports.GetDireccion = GetDireccion;
const PostDireccionExtra = async (req, h) => {
    const { payload } = req;
    const { error } = schemasjoi_direccion_1.validacionDireccion.validate(payload);
    if (error) {
        return h.response(error.message).code(409);
    }
    else {
        let client = await connection_postgres_1.pool.connect();
        try {
            let query = "";
            const { tipo_via, numero_via, letra_via, numero_cuadra, numero_casa, datos_extra, numero_extra } = req.payload;
            query = `INSERT INTO direccion (tipo_via, numero_via, letra_via, numero_cuadra, numero_casa, datos_extra, numero_extra) 
            VALUES ('${tipo_via}', ${numero_via}, '${letra_via}', ${numero_cuadra}, ${numero_casa}, '${datos_extra}', ${numero_extra});`;
            const result = await client.query(query);
            return h.response("Dirección guardada con exito").code(200);
        }
        catch (error) {
            return h.response(error).code(400);
        }
        finally {
            client.release(true);
        }
    }
};
exports.PostDireccionExtra = PostDireccionExtra;
const PostDireccion = async (req, h) => {
    let client = await connection_postgres_1.pool.connect();
    const { payload } = req;
    const { error } = schemasjoi_direccion_1.validacionDireccion.validate(payload);
    if (error) {
        return h.response(error.message).code(409);
    }
    else {
        try {
            let query = "";
            const { tipo_via, numero_via, letra_via, numero_cuadra, numero_casa } = req.payload;
            query = `INSERT INTO direccion (tipo_via, numero_via, letra_via, numero_cuadra, numero_casa) 
            VALUES ('${tipo_via}', ${numero_via}, '${letra_via}', ${numero_cuadra}, ${numero_casa});`;
            const result = await client.query(query);
            return h.response("Dirección guardada con exito").code(200);
        }
        catch (error) {
            return h.response(error).code(400);
        }
        finally {
            client.release(true);
        }
    }
};
exports.PostDireccion = PostDireccion;
