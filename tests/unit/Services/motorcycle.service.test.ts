import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon, { SinonStub } from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/motorcycle.service';
import MotorcycleMocks from '../../mocks/motorcycle.mocks';

describe('Unit tests for MotorcycleService', function () {
  describe('Tests MotorcycleService.insert', function () {
    it('Should succesfully insert into the database', async function () {
      const { validMotorcycle } = MotorcycleMocks.input;
      const { motorcycleOutput } = MotorcycleMocks.output;

      Sinon.stub(Model, 'create').resolves(motorcycleOutput);
      const service = new MotorcycleService();

      const response = await service.insert(validMotorcycle);

      expect(response).to.deep.equal(new Motorcycle(motorcycleOutput));
      (Model.create as SinonStub).restore();
    });
  });
});
