import { Router } from 'express';
import VehicleController from '../Controllers/vehicle.controller';
import MotorcycleService from '../Services/motorcycle.service';

const MotorcycleRouter = Router();
const controller = new VehicleController(new MotorcycleService());

MotorcycleRouter.post('/', controller.insert);
MotorcycleRouter.get('/', controller.getAll);

MotorcycleRouter.get('/:id', controller.findById);
MotorcycleRouter.put('/:id', controller.update);

export default MotorcycleRouter;
