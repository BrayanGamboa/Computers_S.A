import { Request, ResponseToolkit } from "@hapi/hapi";
import { pool } from "../database/connection.postgres"
import { QueryResult } from "pg";
import { validacionDireccion } from "../validation/schemasjoi.direccion";


export const GetDireccion = async (req: Request, h: ResponseToolkit) => {
    let client = await pool.connect();
    try {
        const result: QueryResult = await client.query("SELECT * FROM direccion;");

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

export const PostDireccionExtra = async (req: Request, h: ResponseToolkit) => {
    const { payload } = req;
    const { error } = validacionDireccion.validate(payload);
    if (error) {
        return h.response(error.message).code(409);
    } else {
        let client = await pool.connect();
        try {
            let query = "";
            const { tipo_via, numero_via, letra_via, numero_cuadra, numero_casa, datos_extra, numero_extra }: any = req.payload;
            query = `INSERT INTO direccion (tipo_via, numero_via, letra_via, numero_cuadra, numero_casa, datos_extra, numero_extra) 
            VALUES ('${tipo_via}', ${numero_via}, '${letra_via}', ${numero_cuadra}, ${numero_casa}, '${datos_extra}', ${numero_extra});`

            const result: QueryResult = await client.query(query);
            return h.response("Dirección guardada con exito").code(200);
        } catch (error: any) {
            return h.response(error).code(400);
        } finally {
            client.release(true);
        }
    }
};

export const PostDireccion = async (req: Request, h: ResponseToolkit) => {
    let client = await pool.connect();
    const { payload } = req;
    const { error } = validacionDireccion.validate(payload);
    if (error) {
        return h.response(error.message).code(409);
    } else {
        try {
            let query = "";
            const { tipo_via, numero_via, letra_via, numero_cuadra, numero_casa }: any = req.payload;
            query = `INSERT INTO direccion (tipo_via, numero_via, letra_via, numero_cuadra, numero_casa) 
            VALUES ('${tipo_via}', ${numero_via}, '${letra_via}', ${numero_cuadra}, ${numero_casa});`

            const result: QueryResult = await client.query(query);
            return h.response("Dirección guardada con exito").code(200);
        } catch (error: any) {
            return h.response(error).code(400);
        } finally {
            client.release(true);
        }
    }
};
