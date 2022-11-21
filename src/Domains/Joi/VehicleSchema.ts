import Joi from 'joi';

const VehicleSchema = Joi.object().keys({
  model: Joi.string(),
  year: Joi.number().min(0),
  color: Joi.string(),
  status: Joi.boolean(),
  buyValue: Joi.number().min(0),
});

export default VehicleSchema;
