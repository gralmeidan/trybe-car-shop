import { expect } from 'chai';
import { Model } from 'mongoose';
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
});
