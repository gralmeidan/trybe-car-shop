import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import request from 'supertest';
import app from '../../../src/app';
import Car from '../../../src/Domains/Car';
import CarMocks from '../../mocks/car.mocks';

describe('Tests for all routes on /cars', function () {
  describe('Tests POST /cars', function () {
    it('Should successfully register a car', async function () {
      const { validCar } = CarMocks.input;
      const { carOutput } = CarMocks.output;

      Sinon.stub(Model, 'create').resolves(carOutput);

      const response = await request(app).post('/cars').send(validCar);

      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(new Car(carOutput));
      (Model.create as Sinon.SinonStub).restore();
    });
  });

  describe('Tests GET /cars', function () {
    it('Should succesfully return all cars', async function () {
      const { carsOutput } = CarMocks.output;

      Sinon.stub(Model, 'find').resolves(carsOutput);

      const response = await request(app).get('/cars').send();

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(
        carsOutput.map((car) => new Car(car)),
      );
      (Model.find as Sinon.SinonStub).restore();
    });
  });
});
