import { Request, ResponseToolkit } from "@hapi/hapi";
import { pool } from "../database/connection.postgres"
import { QueryResult } from "pg";

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
    let client = await pool.connect();
    try {
        let query = "";
        try {
            const { nombre, descripcion, cantidad }: any = req.payload;
            query = `INSERT INTO producto (nombre, descripcion, cantidad) VALUES ('${nombre}', '${descripcion}', ${cantidad});`
        } catch (error) {
            return h.response(`Error: conflicto de datos`).code(409);
        }        
        const result: QueryResult = await client.query(query);
        return h.response("Producto guardado con exito").code(200);
    } catch (error: any) {
        return h.response(`Producto ya se encuentra registrado. ${error}`).code(400);
    } finally {
        client.release(true);
    }
};


