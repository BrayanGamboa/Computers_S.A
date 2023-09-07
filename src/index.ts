import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import routes from './routes/index.routes'
import morgan from 'morgan';
import inert from '@hapi/inert';
import vision from '@hapi/vision'
import hapiswagger from 'hapi-swagger';
import { sequelize } from './database/connection.postgres';

dotenv.config();

const init = async () => {
    const server = Hapi.server({
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
        inert,
        vision,
        {
            plugin: hapiswagger,
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
    

    server.route(routes);

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return "Hola server";
        }
    });

    server.ext('onRequest', (request, h) => {
        morgan('dev')(request.raw.req, request.raw.res, (err) => {
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
        await sequelize.authenticate();
        console.log('Conexión exitosa con la base de datos.');
    } catch (error) {
        console.error('Error al tratar de conectar a la base de datos: ', error);
    } finally {
        sequelize.close();
    }
}

conexionSequelize();
init();
