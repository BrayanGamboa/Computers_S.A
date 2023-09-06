
import { Request, ResponseToolkit } from "@hapi/hapi";

// import * as package from ""

export const route1 = (req: Request, h: ResponseToolkit) => {
    const name = req.params.name;
    return 'Hola ' + name;
};

export const route2 = async (req: Request, h: ResponseToolkit) => {
    // Lógica para la ruta 2
    console.log(req.payload);

    return `Welcome {name}!`;




};


