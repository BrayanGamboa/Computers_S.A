import * as Joi from 'joi';

export const validacionProducto = Joi.object({
    nombre: Joi.string().required(), 
    descripcion: Joi.string().required(),
    cantidad: Joi.number().required(),    
});
