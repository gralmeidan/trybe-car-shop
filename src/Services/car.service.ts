import Car from '../Domains/Car';
import RestError from '../Errors/RestError';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private validateId = (id: string) => {
    if (!/^[a-f\d]{24}$/i.test(id)) {
      throw new RestError(422, 'Invalid mongo id');
    }
  };

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

  public findById = async (id: string) => {
    this.validateId(id);

    const odm = new CarODM();
    const response = await odm.findById(id);

    if (!response) {
      throw new RestError(404, 'Car not found');
    }

    return this.createCarDomain(response);
  };

  public update = async (id: string, options: Partial<Omit<ICar, '_id'>>) => {
    this.validateId(id);

    const odm = new CarODM();
    const updateResult = await odm.updateById(id, options);

    if (!updateResult.matchedCount) {
      throw new RestError(404, 'Car not found');
    }

    return this.findById(id);
  };
}
