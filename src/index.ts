import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import routes from './routes/index.routes'
import morgan from 'morgan';
import inert from '@hapi/inert';
import vision from '@hapi/vision'
import hapiswagger from 'hapi-swagger';


dotenv.config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.port || 3001,
        host: process.env.host
    });

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
            }
        }
    ]);
    

    server.route(routes);

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return {
                message: 'Hola server'
            };
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

init();
