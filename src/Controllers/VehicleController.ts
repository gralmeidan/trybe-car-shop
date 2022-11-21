import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import MotorcycleService from '../Services/MotorcycleService';

export default class VehicleController {
  constructor(private service: CarService | MotorcycleService) {}

  public insert = async (req: Request, res: Response) => {
    const result = await this.service.insert(req.body);

    res.status(201).json(result);
  };

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();

    res.status(200).json(result);
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.service.findById(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.service.update(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
