"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_producto_1 = require("../controllers/query.producto");
const query_direccion_1 = require("../controllers/query.direccion");
const query_pedido_1 = require("../controllers/query.pedido");
const query_cantidad_producto_1 = require("../controllers/query.cantidad_producto");
const routes = [
    // Rutas que interactuan con la tabla 'productos'
    {
        method: 'GET',
        path: '/producto',
        options: {
            handler: query_producto_1.GetProductos,
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
            handler: query_producto_1.PostProducto,
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
            handler: query_direccion_1.GetDireccion,
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
            handler: query_direccion_1.PostDireccionExtra,
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
            handler: query_direccion_1.PostDireccion,
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
            handler: query_pedido_1.GetPedido,
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
            handler: query_pedido_1.PostPedido,
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
            }
        }
    },
    {
        method: 'GET',
        path: '/cancelarPedido/{id_pedido}',
        options: {
            handler: query_pedido_1.CancelarPedido,
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
            }
        }
    },
    //Rutas que interactuan con la tabla 'Cantidad Producto'
    {
        method: 'GET',
        path: '/cantidadProducto',
        options: {
            handler: query_cantidad_producto_1.GetCantidadProducto,
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
            handler: query_cantidad_producto_1.PostCantidadProducto,
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
            }
        }
    },
];
exports.default = routes;
module.exports = routes;
