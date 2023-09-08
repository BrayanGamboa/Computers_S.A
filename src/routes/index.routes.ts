import { ServerRoute } from "@hapi/hapi";



//Productos
import { GetProductos, PostProducto } from "../controllers/query.producto";
import { validacionProducto } from "../validation/schemasjoi.producto";


//Dirección
import { GetDireccion, PostDireccionExtra, PostDireccion } from "../controllers/query.direccion"
import {validacionDireccion} from "../validation/schemasjoi.direccion"

//Pedidos 
import { GetPedido, PostPedido, CancelarPedido } from "../controllers/query.pedido";
import { validacionPedido, validacionPedidoId} from "../validation/schemasjoi.pedido";

//Cantidad de productos
import { GetCantidadProducto, PostCantidadProducto } from "../controllers/query.cantidad_producto";
import { validacionCantidadProducto } from "../validation/schemasjoi.cantidad_producto";




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
            400: { descripcion: "Error de petición" },
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
      },validate:{
        payload:validacionProducto
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
            400: { descripcion: "Error de petición" },
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
      },validate:{
        payload:validacionDireccion
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
      },validate:{
        payload:validacionDireccion
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
            400: { descripcion: "Error de petición" },
          },
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/pedido',
    options: {
      handler: PostPedido,
      description: "POST de pedido",
      notes: "Es la responsable de crear nuevos pedidos.",
      tags: ["api", "Pedido", "Post"],
      plugins: {
        "hapi-swagger": {
          responses: {
            200: { description: "Respuesta exitosa" },
            409: { descripcion: "Error al enviar los datos (Conflicto de datos)" },
            400: { descripcion: "Error de petición" },
            401: { descripcion: "Ya se tiene un pedido registrado" },
          },
        }
      },
      validate:{
        payload: validacionPedido
      }
    }
  },
  {
    method: 'GET',
    path: '/cancelarPedido/{id_pedido}',
    options: {
      handler: CancelarPedido,
      description: "Cancela un pedido",
      notes: "Es la encargada de cancelar el pedido si se encuentran en los estados de 'Realizado' o 'En Bodega'.",
      tags: ["api", "Pedido", "Get"],
      plugins: {
        "hapi-swagger": {
          responses: {
            200: { description: "Respuesta exitosa" },
            401: { descripcion: "No cumple con los requisitos" },
            400: { descripcion: "Error de petición" },
          },
        }
      },validate:{
        params: validacionPedidoId
      }
    }
  },
  //Rutas que interactuan con la tabla 'Cantidad Producto'
  {
    method: 'GET',
    path: '/cantidadProducto',
    options: {
      handler: GetCantidadProducto,
      description: "GET de Cantidad de Productos",
      notes: "Ruta encargada de traer todos los productos (con sus cantidades respectivas) que el usuario ingresó",
      tags: ["api", "Cantidad Producto", "Get"],
      plugins: {
        "hapi-swagger": {
          responses: {
            200: { description: "Respuesta exitosa" },
            204: { descripcion: "Sin datos registrados" },
            400: { descripcion: "Error interno del servidor" },
          },
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/cantidadProducto',
    options: {
      handler: PostCantidadProducto,
      description: "POST de pedido",
      notes: "Es la responsable de crear nuevos pedidos.",
      tags: ["api", "Cantidad Producto", "Post"],
      plugins: {
        "hapi-swagger": {
          responses: {
            200: { description: "Respuesta exitosa" },
            409: { descripcion: "Error al enviar los datos (Conflicto de datos)" },
            400: { descripcion: "Error de petición" },
            401: { descripcion: "Excede la cantidad de productos permitida" },
            406: { descripcion: "Los artículos solicitados no están disponibles" },
          }
        }
      },validate:{
        payload:validacionCantidadProducto
      }
    }
  },
];

export default routes;


module.exports = routes;
