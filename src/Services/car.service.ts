import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private createCarDomain = (car: ICar): Car => new Car(car);

  public insert = async (car: ICar) => {
    const odm = new CarODM();
    const response = await odm.create(car);
    return this.createCarDomain(response);
  };

  public getAll = async () => {
    const odm = new CarODM();
    const response = await odm.getAll();
    return response.map(this.createCarDomain);
  };

  public findById = async (id: string) => ({});
}
