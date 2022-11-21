import express from 'express';
import handleError from './Middlewares/handleError.middleware';
import CarRouter from './Routes/Car.routes';
import MotorcycleRouter from './Routes/Motorcycle.routes';

const app = express();

app.use(express.json());
app.use('/cars', CarRouter);
app.use('/motorcycles', MotorcycleRouter);

app.use(handleError);

export default app;
