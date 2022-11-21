import { expect } from 'chai';
import { Model, UpdateWriteOpResult } from 'mongoose';
import Sinon, { SinonStub } from 'sinon';
import request from 'supertest';
import app from '../../../src/app';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleMocks from '../../mocks/motorcycle.mocks';

describe('Tests for all routes on /motorcycles', function () {
  describe('Tests POST /motorcycles', function () {
    it('Should successfully register a motorcycle', async function () {
      const { validMotorcycle } = MotorcycleMocks.input;
      const { motorcycleOutput } = MotorcycleMocks.output;

      Sinon.stub(Model, 'create').resolves(motorcycleOutput);

      const response = await request(app)
        .post('/motorcycles')
        .send(validMotorcycle);

      (Model.create as SinonStub).restore();
      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(new Motorcycle(motorcycleOutput));
    });
  });

  describe('Tests GET /motorcycles', function () {
    it('Should succesfully return all motorcycles', async function () {
      const { motorcyclesOutput } = MotorcycleMocks.output;

      Sinon.stub(Model, 'find').resolves(motorcyclesOutput);

      const response = await request(app).get('/motorcycles').send();

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(
        motorcyclesOutput.map((mot) => new Motorcycle(mot)),
      );
      (Model.find as Sinon.SinonStub).restore();
    });
  });

  describe('Tests GET /motorcycles/:id', function () {
    afterEach(function () {
      (Model.findOne as Sinon.SinonStub).restore();
    });

    it('Should succesfully return a motorcycle', async function () {
      const { motorcycleOutput } = MotorcycleMocks.output;
      Sinon.stub(Model, 'findOne').resolves(motorcycleOutput);

      const url = `/motorcycles/${motorcycleOutput._id}`;
      const response = await request(app).get(url).send();

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(new Motorcycle(motorcycleOutput));
    });

    it('Should return an error when receiving an invalid id', async function () {
      const { motorcycleOutput } = MotorcycleMocks.output;
      Sinon.stub(Model, 'findOne').resolves(motorcycleOutput);

      const url = '/motorcycles/invalid%20id';
      const response = await request(app).get(url).send();

      expect(response.status).to.equal(422);
      expect(response.body).to.deep.equal({
        message: 'Invalid mongo id',
      });
    });
  });

  describe('Tests PUT /motorcycles/:id', function () {
    afterEach(function () {
      (Model.findOne as Sinon.SinonStub).restore();
      (Model.updateOne as Sinon.SinonStub).restore();
    });

    it('Should succesfully return the updated motorcycle', async function () {
      const { motorcycleOutput } = MotorcycleMocks.output;
      Sinon.stub(Model, 'findOne').resolves({
        ...motorcycleOutput,
        color: 'Turquoise',
      });
      Sinon.stub(Model, 'updateOne').resolves({
        matchedCount: 1,
      } as unknown as UpdateWriteOpResult);

      const url = `/motorcycles/${motorcycleOutput._id}`;
      const response = await request(app).put(url).send({
        color: 'Turquoise',
      });

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(
        new Motorcycle({
          ...motorcycleOutput,
          color: 'Turquoise',
        }),
      );
    });

    it('Should return an error when the motorcycle is not found', async function () {
      const { motorcycleOutput } = MotorcycleMocks.output;
      Sinon.stub(Model, 'findOne').resolves(undefined);
      Sinon.stub(Model, 'updateOne').resolves({
        matchedCount: 0,
      } as unknown as UpdateWriteOpResult);

      const url = `/motorcycles/${motorcycleOutput._id}`;
      const response = await request(app).put(url).send({
        color: 'Turquoise',
      });

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: 'Motorcycle not found',
      });
    });
  });
});
