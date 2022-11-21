import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleSchema from './Joi/MotorcycleSchema';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: 'Street' | 'Custom' | 'Trail';
  private engineCapacity: number;

  constructor(props: IMotorcycle) {
    super(props);
    this.category = props.category;
    this.engineCapacity = props.engineCapacity;
  }

  public getCategory() {
    return this.category;
  }
  public getEngineCapacity() {
    return this.engineCapacity;
  }

  static Schema = MotorcycleSchema;
}
