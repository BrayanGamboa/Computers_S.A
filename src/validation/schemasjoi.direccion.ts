import * as Joi from 'joi';

export const validacionDireccion = Joi.object({
    tipo_via: Joi.string().valid('Calle', 'Carrera').required(),
    numero_via: Joi.number().required(),
    letra_via: Joi.string().required(),
    numero_cuadra:Joi.number().required(),
    numero_casa:Joi.number().required(),
    datos_extra:Joi.string().valid('APP', 'INT'),
    numero_extra:Joi.number(),
});
