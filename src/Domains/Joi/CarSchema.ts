import Joi from 'joi';
import VehicleSchema from './VehicleSchema';

const CarSchema = VehicleSchema.keys({
  seatsQty: Joi.number().min(1),
  doorsQty: Joi.number().min(1),
});

export default CarSchema;
