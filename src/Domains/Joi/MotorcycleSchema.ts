import Joi from 'joi';
import VehicleSchema from './VehicleSchema';

const MotorcycleSchema = VehicleSchema.keys({
  category: Joi.string().valid('Street', 'Custom', 'Trail'),
  engineCapacity: Joi.number().min(1),
});

export default MotorcycleSchema;
