import { Request, Response } from 'express';
import MotorcycleService from '../Services/motorcycle.service';

export default class MotorcycleController {
  constructor(private service = new MotorcycleService()) {}

  public insert = async (req: Request, res: Response) => {
    const result = await this.service.insert(req.body);

    res.status(201).json(result);
  };
}
