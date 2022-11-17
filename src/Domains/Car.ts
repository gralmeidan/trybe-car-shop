import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(props: ICar) {
    super(props);
    this.doorsQty = props.doorsQty;
    this.seatsQty = props.seatsQty;
  }

  public getDoorsQty = () => this.doorsQty;
  public getSeatsQty = () => this.seatsQty;
}
