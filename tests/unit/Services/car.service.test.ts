import Sinon from 'sinon';
import { expect } from 'chai';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/car.service';
import CarMocks from '../../mocks/car.mocks';
import Car from '../../../src/Domains/Car';

describe('Unit tests for CarService', function () {
  describe('Tests CarService.insert', function () {
    it('Should successfully insert into the database', async function () {
      const { validCar } = CarMocks.input;
      const { carOutput } = CarMocks.output;

      const odm = {
        create: Sinon.stub().resolves(carOutput),
      } as unknown as CarODM;
      const service = new CarService(odm);

      const response = await service.insert(validCar);

      expect(response).to.deep.equal(new Car(carOutput));
    });
  });
  describe('Tests CarService.getAll', function () {
    it('Should list all cars on DB', async function () {
      const { carsOutput } = CarMocks.output;

      const odm = {
        getAll: Sinon.stub().resolves(carsOutput),
      } as unknown as CarODM;
      const service = new CarService(odm);

      const response = await service.getAll();

      expect(response).to.deep.equal(carsOutput.map((car) => new Car(car)));
    });
  });
});
