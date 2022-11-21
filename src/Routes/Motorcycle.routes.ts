import { Router } from 'express';
import VehicleController from '../Controllers/VehicleController';
import MotorcycleService from '../Services/MotorcycleService';

const MotorcycleRouter = Router();
const controller = new VehicleController(new MotorcycleService());

MotorcycleRouter.post('/', controller.insert);
MotorcycleRouter.get('/', controller.getAll);

MotorcycleRouter.get('/:id', controller.findById);
MotorcycleRouter.put('/:id', controller.update);
MotorcycleRouter.delete('/:id', controller.removeById);

export default MotorcycleRouter;
