import express from 'express';
import handleError from './Middlewares/handleError.middleware';
import CarRouter from './Routes/car.routes';
import MotorcycleRouter from './Routes/motorcycle.routes';

const app = express();

app.use(express.json());
app.use('/cars', CarRouter);
app.use('/motorcycles', MotorcycleRouter);

app.use(handleError);

export default app;
