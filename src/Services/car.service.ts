import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  constructor(protected odm: CarODM = new CarODM()) {}

  private createCarDomain = (car: ICar): Car => new Car({ ...car });

  public insert = async (car: ICar) => {
    const response = await this.odm.create(car);
    return this.createCarDomain(response);
  };
}
