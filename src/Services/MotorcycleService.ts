import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import AbstractService from './AbstractService';

export default class MotorcycleService extends AbstractService<
IMotorcycle,
Motorcycle
> {
  constructor() {
    super(MotorcycleODM, Motorcycle, 'Motorcycle');
  }
}
