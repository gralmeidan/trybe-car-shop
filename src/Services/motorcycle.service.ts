import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private createMotorcycleDomain = (obj: IMotorcycle) => new Motorcycle(obj);

  public insert = async (obj: IMotorcycle) => {
    const odm = new MotorcycleODM();
    const result = await odm.create(obj);
    return this.createMotorcycleDomain(result);
  };
}
