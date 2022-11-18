import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import AbstractService from './abstract.service';

export default class CarService extends AbstractService<ICar, Car> {
  constructor() {
    super(CarODM, Car, 'Car');
  }
}
