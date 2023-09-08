import * as Joi from 'joi';

export const validacionPedido = Joi.object({
    id_direccion: Joi.number().required(),
    estado: Joi.string().valid('Realizado', 'En Bodega', 'En camino', 'Entregado', 'Cancelado').required(),
});

export const validacionPedidoId = Joi.object({
    id_pedido: Joi.number().required()
});

