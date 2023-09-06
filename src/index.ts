import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import routes from './routes/index.routes'

dotenv.config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.port || 3001,
        host: process.env.host
    });

    server.route(routes);

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return "Hola server";
        }
    });


    

    await server.start();
    console.log(`Servidor activo en la dirección: ${server.info.uri}`);
};

init();

