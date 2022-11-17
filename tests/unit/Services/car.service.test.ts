import Sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/car.service';
import CarMocks from '../../mocks/car.mocks';
import Car from '../../../src/Domains/Car';

describe('Unit tests for CarService', function () {
  describe('Tests CarService.insert', function () {
    it('Should successfully insert into the database', async function () {
      const { validCar } = CarMocks.input;
      const { carOutput } = CarMocks.output;

      Sinon.stub(Model, 'create').resolves(carOutput);
      const service = new CarService();

      const response = await service.insert(validCar);

      expect(response).to.deep.equal(new Car(carOutput));
      (Model.create as Sinon.SinonStub).restore();
    });
  });
  describe('Tests CarService.getAll', function () {
    it('Should list all cars on DB', async function () {
      const { carsOutput } = CarMocks.output;

      Sinon.stub(Model, 'find').resolves(carsOutput);
      const service = new CarService();

      const response = await service.getAll();

      expect(response).to.deep.equal(carsOutput.map((car) => new Car(car)));
      (Model.find as Sinon.SinonStub).restore();
    });
  });
});
