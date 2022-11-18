import { Router } from 'express';
import VehicleController from '../Controllers/vehicle.controller';
import CarService from '../Services/car.service';

const CarRouter = Router();
const controller = new VehicleController(new CarService());

CarRouter.post('/', controller.insert);
CarRouter.get('/', controller.getAll);

CarRouter.get('/:id', controller.findById);
CarRouter.put('/:id', controller.update);

export default CarRouter;
