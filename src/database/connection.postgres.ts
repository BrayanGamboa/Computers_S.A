import { Pool } from "pg";
import * as dotenv from "dotenv";


dotenv.config();


export const pool = new Pool({
    host: process.env.HOST_BD,
    user: process.env.USER_BD,
    password: process.env.PASS_BD,
    database: process.env.NAME_BD
})
try {
    console.log("Conexión a la BD activa");
} catch (err: any) {
    console.log("Error to connected the database: ", err.message);
    throw new Error(err);    
};