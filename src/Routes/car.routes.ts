import { Router } from 'express';
import CarController from '../Controllers/car.controller';

const CarRouter = Router();
const controller = new CarController();

CarRouter.post('/', controller.insert);
CarRouter.get('/', controller.getAll);

CarRouter.get('/:id', controller.findById);
CarRouter.put('/:id', controller.update);

export default CarRouter;
