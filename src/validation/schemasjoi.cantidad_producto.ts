import * as Joi from 'joi';

export const validacionCantidadProducto = Joi.object({
    id_producto: Joi.number().required(),
    cantidad: Joi.number().required(),
    id_pedido: Joi.number().required(),
});
