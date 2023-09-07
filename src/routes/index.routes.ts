import { ServerRoute } from "@hapi/hapi";

import { GetProductos, PostProducto } from "../controllers/query.producto";

import { GetDireccion, PostDireccionExtra, PostDireccion } from "../controllers/query.direccion"

import { GetPedido } from "../controllers/query.pedido";

const routes: ServerRoute[] = [


  // Rutas que interactuan con la tabla 'productos'
  {
    method: 'GET',
    path: '/producto',
    options: {
      handler: GetProductos,
      description: "GET de productos",
      notes: "Es la encargada de traer todos los productos en la base de datos",
      tags: ["api", "Productos", "Get"],
      plugins: {
        "hapi-swagger": {
          responses: {
            200: { description: "Respuesta exitosa" },
            204: { descripcion: "Sin datos registrados" },
            500: { descripcion: "Error interno del servidor" },
          },
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/producto',
    options: {
      handler: PostProducto,
      description: "POST de productos",
      notes: "Es la responsable de crear nuevos productos en la base de datos",
      tags: ["api", "Productos", "Post"],
      plugins: {
        "hapi-swagger": {
          responses: {
            200: { description: "Respuesta exitosa" },
            409: { descripcion: "Error al enviar los datos (Conflicto de datos)" },
            400: { descripcion: "Producto ya se encuentra registrado (producto duplicado)" },
          },
        }
      }
    }
  },
  {
    //Rutas que interactuan con la tabla 'dirección'
    method: 'GET',
    path: '/direccion',
    options: {
      handler: GetDireccion,
      description: "GET de direcciones",
      notes: "Es la encargada de traer todos las direcciones que se encuentran en la tabla direcciones registradas en la base de datos",
      tags: ["api", "Dirección", "Get"],
      plugins: {
        "hapi-swagger": {
          responses: {
            200: { description: "Respuesta exitosa" },
            204: { descripcion: "Sin datos registrados" },
            500: { descripcion: "Error interno del servidor" },
          },
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/direccionDetallada',
    options: {
      handler: PostDireccionExtra,
      description: "POST de dirección Detallada",
      notes: "Esta es la responsable de guardar la dirección de manera detallada o extendida, es decir: INT (Interior) y APP (Apartamento). ",
      tags: ["api", "Dirección", "Post"],
      plugins: {
        "hapi-swagger": {
          responses: {
            200: { description: "Respuesta exitosa" },
            409: { descripcion: "Error al enviar los datos (Conflicto de datos)" },
            400: { descripcion: "Error de petición" },
          },
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/direccion',
    options: {
      handler: PostDireccion,
      description: "POST de dirección",
      notes: "Es la responsable de crear nuevas direcciones 'simples', sin INT (Interior) o APP (Apartamento).",
      tags: ["api", "Dirección", "Post"],
      plugins: {
        "hapi-swagger": {
          responses: {
            200: { description: "Respuesta exitosa" },
            409: { descripcion: "Error al enviar los datos (Conflicto de datos)" },
            400: { descripcion: "Error de petición" },
          },
        }
      }
    }
  },
  //Rutas que interactuan con la tabla 'pedidos'
  {
    method: 'GET',
    path: '/pedido',
    options: {
      handler: GetPedido,
      description: "GET de pedidos",
      notes: "Es la encargada de traer todos los pedidos que se encuentran en la tabla 'pedido' registradas en la base de datos",
      tags: ["api", "Pedido", "Get"],
      plugins: {
        "hapi-swagger": {
          responses: {
            200: { description: "Respuesta exitosa" },
            204: { descripcion: "Sin datos registrados" },
            500: { descripcion: "Error interno del servidor" },
          },
        }
      }
    }
  },

];

export default routes;


module.exports = routes;
