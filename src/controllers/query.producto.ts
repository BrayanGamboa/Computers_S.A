import { Request, ResponseToolkit } from "@hapi/hapi";
import { pool } from "../database/connection.postgres"
import { QueryResult } from "pg";
import { validacionProducto } from "../validation/schemasjoi.producto";


export const GetProductos = async (req: Request, h: ResponseToolkit) => {
    let client = await pool.connect();
    try {
        const result: QueryResult = await client.query("SELECT * FROM producto;");
        if (result.rowCount != 0) {
            return h.response(result.rows).code(200);
        } else {
            return h.response("Sin datos").code(204);
        }
    } catch (error: any) {
        return h.response("Error interno").code(500);
    } finally {
        client.release(true);
    }
};

export const PostProducto = async (req: Request, h: ResponseToolkit) => {
    const { payload } = req;
    const { error } = validacionProducto.validate(payload);
    if (error) {
        return h.response(error.message).code(400);
    } else {
        let client = await pool.connect();
        try {
            
            const { nombre, descripcion, cantidad }: any = req.payload;
            let query = `INSERT INTO producto (nombre, descripcion, cantidad) VALUES ('${nombre}', '${descripcion}', ${cantidad});`
            const result: QueryResult = await client.query(query);

            return h.response("Producto guardado con exito").code(200);
        } catch (error: any) {
            return h.response(`Producto ya se encuentra registrado. ${error}`).code(400);
        } finally {
            client.release(true);
        }
    }
};


