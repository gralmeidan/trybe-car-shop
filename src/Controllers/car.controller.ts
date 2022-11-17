import { Request, Response } from 'express';
import CarService from '../Services/car.service';

export default class CarController {
  constructor(private service = new CarService()) {}

  public insert = async (req: Request, res: Response) => {
    const result = await this.service.insert(req.body);

    res.status(201).json(result);
  };
}
