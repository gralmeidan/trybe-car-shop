import express from 'express';
import CarRouter from './Routes/car.routes';

const app = express();

app.use(express.json());
app.use('/cars', CarRouter);

export default app;
