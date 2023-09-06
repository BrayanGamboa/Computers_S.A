import { ServerRoute } from "@hapi/hapi";

import {route1, route2} from "../controllers/query.producto";


// options: {
//   handler: async (request, h) => {
//     const {
//       num_placa,
//       fch_vence_seg,
//       modelo,
//       fch_vence_tecno,
//       linea,
//       url_img,
//     } = request.payload;
//     await psqlConnection.query(`INSERT INTO vehiculo (num_placa,  modelo,fch_vence_seg, 
//       fch_vence_tecno, linea, url_img) VALUES ('${num_placa}', '${modelo}','${fch_vence_seg}',  '${fch_vence_tecno}', 
//       ${linea}, '${url_img}');`);
//     try {
//       return h.response("Vehículo registrado correctamente").code(200);
//     } catch (error) {
//       console.log(error);
//       return h.response(error).code(409);
//     }
//   },
//   description: "Crear un vehículo.",
//   tags: ["api", "Vehículos"],
//   plugins: {
//     "hapi-swagger": {
//       responses: {
//         200: { description: "Petición correcta" },
//         204: { descripcion: "Sin datos registrados" },
//         409: { descripcion: "Conflicto de datos" },
//         500: { descripcion: "Error interno del servidor" },
//       },
//     },
//   },
//   validate: {
//     payload: vehiculoSchemmaNew,
//   },
// },



const routes: ServerRoute[] = [

    {
      method: 'GET',
      path: '/1/{name}',
      
      handler: route1,
    },
    {
      method: 'POST',
      path: '/2',
      handler: route2,      
    },
  ];
  
  export default routes;


module.exports = routes;
