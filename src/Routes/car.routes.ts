import { Router } from 'express';
import CarController from '../Controllers/car.controller';

const CarRouter = Router();
const controller = new CarController();

CarRouter.post('/', controller.insert);

export default CarRouter;
