import IVehicle from '../Interfaces/IVehicle';

export default abstract class Vehicle {
  protected id?: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;

  constructor(props: IVehicle) {
    this.id = props.id;
    this.model = props.model;
    this.year = props.year;
    this.color = props.color;
    this.status = Boolean(props.status) || false;
    this.buyValue = props.buyValue;
  }

  public getId = () => this.id;
  public getModel = () => this.model;
  public getYear = () => this.year;
  public getColor = () => this.color;
  public getStatus = () => this.status;
  public getBuyValue = () => this.buyValue;
}
