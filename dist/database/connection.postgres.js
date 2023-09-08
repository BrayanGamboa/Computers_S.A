"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.sequelize = void 0;
const pg_1 = require("pg");
const dotenv = __importStar(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv.config();
exports.sequelize = new sequelize_1.Sequelize(`${process.env.NAME_BD}`, `${process.env.USER_BD}`, `${process.env.PASS_BD}`, {
    host: process.env.HOST_BD,
    dialect: 'postgres'
});
exports.pool = new pg_1.Pool({
    host: process.env.HOST_BD,
    user: process.env.USER_BD,
    password: process.env.PASS_BD,
    database: process.env.NAME_BD
});
try {
    console.log("Conexión a la BD activa");
    // console.log(process.env.HOST_BD,
    //     process.env.USER_BD,
    //     process.env.PASS_BD,
    //     process.env.NAME_BD);
}
catch (err) {
    throw new Error(err);
    console.log("Error to connected the database: ", err.message);
}
;
