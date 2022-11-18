import Sinon from 'sinon';
import { expect } from 'chai';
import { Model, UpdateWriteOpResult } from 'mongoose';
import CarService from '../../../src/Services/car.service';
import CarMocks from '../../mocks/car.mocks';
import Car from '../../../src/Domains/Car';
import RestError from '../../../src/Errors/RestError';

const DidNotThrow = 'Did not throw';

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
  describe('Tests CarService.findById', function () {
    afterEach(function () {
      (Model.findOne as Sinon.SinonStub).restore();
    });

    const service = new CarService();

    it('Should list the correct car', async function () {
      const { carOutput } = CarMocks.output;
      Sinon.stub(Model, 'findOne').resolves(carOutput);

      const response = await service.findById(carOutput._id);

      expect(response).to.deep.equal(new Car(carOutput));
    });

    it('Should throw an error when the car is not found', async function () {
      const { carOutput } = CarMocks.output;
      Sinon.stub(Model, 'findOne').resolves(undefined);

      try {
        await service.findById(carOutput._id);
        throw new Error(DidNotThrow);
      } catch (error) {
        expect((error as RestError).statusCode).to.equal(404);
      }
    });

    it('Should throw an error when the id received is invalid', async function () {
      Sinon.stub(Model, 'findOne').resolves(undefined);

      try {
        await service.findById('id invalido');
        throw new Error(DidNotThrow);
      } catch (error) {
        expect((error as RestError).statusCode).to.equal(422);
      }
    });
  });

  describe('Tests CarService.update', function () {
    afterEach(function () {
      (Model.updateOne as Sinon.SinonStub).restore();
      (Model.findOne as Sinon.SinonStub).restore();
    });

    const service = new CarService();

    it('Should return the updated car', async function () {
      const { carOutput } = CarMocks.output;
      Sinon.stub(Model, 'findOne').resolves(carOutput);
      Sinon.stub(Model, 'updateOne').resolves({
        matchedCount: 1,
      } as unknown as UpdateWriteOpResult);

      const response = await service.update(carOutput._id, { year: 2002 });

      expect(response).to.deep.equal(new Car(carOutput));
    });

    it('Should throw an error when the car is not found', async function () {
      const { carOutput } = CarMocks.output;
      Sinon.stub(Model, 'findOne').resolves(carOutput);
      Sinon.stub(Model, 'updateOne').resolves({
        matchedCount: 0,
      } as unknown as UpdateWriteOpResult);

      try {
        await service.update(carOutput._id, { year: 2002 });
        throw new Error(DidNotThrow);
      } catch (error) {
        expect((error as RestError).statusCode).to.equal(404);
      }
    });

    it('Should throw an error when the id received is invalid', async function () {
      Sinon.stub(Model, 'findOne').resolves(undefined);
      Sinon.stub(Model, 'updateOne').resolves({
        matchedCount: 0,
      } as unknown as UpdateWriteOpResult);

      try {
        await service.update('id invalido', { year: 2002 });
        throw new Error(DidNotThrow);
      } catch (error) {
        expect((error as RestError).statusCode).to.equal(422);
      }
    });
  });
});
