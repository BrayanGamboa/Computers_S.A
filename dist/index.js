"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = __importDefault(require("@hapi/hapi"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const morgan_1 = __importDefault(require("morgan"));
const inert_1 = __importDefault(require("@hapi/inert"));
const vision_1 = __importDefault(require("@hapi/vision"));
const hapi_swagger_1 = __importDefault(require("hapi-swagger"));
const connection_postgres_1 = require("./database/connection.postgres");
dotenv_1.default.config();
const init = async () => {
    const server = hapi_1.default.server({
        port: process.env.port || 3001,
        host: process.env.host
    });
    // await server.register([
    //     inert,
    //     vision,
    //     {
    //         plugin: hapiswagger,
    //         options: {
    //             info: {
    //                 title: 'Documentación API Computers S.A',
    //                 version: '1.0.0',
    //                 description: 'Documentación de la API de Computers S.A, creada en TypeScript con Hapi, integrando una base de datos en PostgreSQL'
    //             },
    //             documentationPath: '/api-docs',
    //             servers: [
    //                 {
    //                     URL: `http://localhost:${process.env.PORT}/`,                   
    //                 }
    //             ]
    //         }
    //     }
    // ]);
    await server.register([
        inert_1.default,
        vision_1.default,
        {
            plugin: hapi_swagger_1.default,
            options: {
                info: {
                    title: 'Documentación API Computers S.A',
                    version: '1.0.0',
                    description: 'Documentación de la API de Computers S.A, creada en TypeScript con Hapi, integrando una base de datos en PostgreSQL'
                },
                documentationPath: '/api-docs',
                // servers: [
                //     {
                //         url: `http://localhost:${process.env.PORT}/`,
                //         description: "Local"
                //     }
                // ]
            }
        }
    ]);
    server.route(index_routes_1.default);
    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return "Hola server";
        }
    });
    server.ext('onRequest', (request, h) => {
        (0, morgan_1.default)('dev')(request.raw.req, request.raw.res, (err) => {
            if (err) {
                console.error(err);
            }
        });
        return h.continue;
    });
    await server.start();
    console.log(`Servidor activo en la dirección: ${server.info.uri}`);
};
const conexionSequelize = async () => {
    try {
        await connection_postgres_1.sequelize.authenticate();
        console.log('Conexión exitosa con la base de datos.');
    }
    catch (error) {
        console.error('Error al tratar de conectar a la base de datos: ', error);
    }
    finally {
        connection_postgres_1.sequelize.close();
    }
};
conexionSequelize();
init();
