import { Router } from 'express';
import MotorcycleController from '../Controllers/motorcycle.controller';

const MotorcycleRouter = Router();
const controller = new MotorcycleController();

MotorcycleRouter.post('/', controller.insert);

export default MotorcycleRouter;
