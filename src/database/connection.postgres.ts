import { Pool } from "pg";
import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const sequelize =  new  Sequelize  (`${process.env.NAME_BD}`, `${process.env.USER_BD}`, `${process.env.PASS_BD}`,{
    host: process.env.HOST_BD,
    dialect: 'postgres'
}); 

export const pool = new Pool({
    host: process.env.HOST_BD,
    user: process.env.USER_BD,
    password: process.env.PASS_BD,
    database: process.env.NAME_BD
})
try {
    console.log("Conexión a la BD activa");
    // console.log(process.env.HOST_BD,
    //     process.env.USER_BD,
    //     process.env.PASS_BD,
    //     process.env.NAME_BD);

} catch (err: any) {
    throw new Error(err);
    
    console.log("Error to connected the database: ", err.message);
};