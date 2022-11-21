/* eslint-disable sonarjs/no-duplicate-string */
import Sinon from 'sinon';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import MockService from './utils/MockService';
import RestError from '../../../src/Errors/RestError';

chai.use(sinonChai);
chai.use(chaiAsPromised);

const { expect } = chai;

describe('Unit tests for AbstractService', function () {
  const goty = 'Elden Ring';
  const validInput = {
    goty,
  };
  const dbOutput = {
    _id: '6348513f34c397abcad040b2',
    goty,
  };
  const stdOutput = {
    id: '6348513f34c397abcad040b2',
    goty,
  };
  describe('Tests AbstractService.insert', function () {
    it('Should successfully pass the received object to the ODM', async function () {
      const ODM = {
        create: Sinon.stub().resolves(dbOutput),
      };
      const service = new MockService(ODM);

      const response = await service.insert(validInput);

      expect(response).to.deep.equal(stdOutput);
      expect(ODM.create).to.have.been.calledWith(validInput);
    });

    it('Should throw an error when an invalid value is passed', async function () {
      const ODM = {
        create: Sinon.stub().resolves(dbOutput),
      };
      const service = new MockService(ODM);

      const err = await expect(
        service.insert({ goty: 12345 } as never),
      ).to.be.rejectedWith(RestError);
      expect(err.statusCode).to.equal(422);
      expect(ODM.create).to.not.have.been.called;
    });
  });

  describe('Tests AbstractService.getAll', function () {
    it('Should succesfully map and return the retrieved objects', async function () {
      const ODM = {
        getAll: Sinon.stub().resolves(Array(4).fill(dbOutput)),
      };
      const service = new MockService(ODM);

      const response = await service.getAll();

      expect(response).to.deep.equal(Array(4).fill(stdOutput));
      expect(ODM.getAll).to.have.been.calledOnce;
    });
  });

  describe('Tests AbstractService.findById', function () {
    it('Should succesfully return the retrieved object', async function () {
      const ODM = {
        findById: Sinon.stub().resolves(dbOutput),
      };
      const service = new MockService(ODM);

      const response = await service.findById(stdOutput.id);

      expect(response).to.deep.equal(stdOutput);
      expect(ODM.findById).to.have.been.calledWith(stdOutput.id);
    });

    it('Should throw an error when the requested object is not found', async function () {
      const ODM = {
        findById: Sinon.stub().resolves(undefined),
      };
      const service = new MockService(ODM);

      const err = await expect(
        service.findById(stdOutput.id),
      ).to.be.rejectedWith(RestError);
      expect(err.statusCode).to.equal(404);
      expect(err.message).to.equal('Mock not found');
    });

    it('Should throw an error when the id is invalid', async function () {
      const ODM = {
        findById: Sinon.stub().resolves(stdOutput),
      };
      const service = new MockService(ODM);

      const err = await expect(
        service.findById('INVALID ID'),
      ).to.be.rejectedWith(RestError);
      expect(err.statusCode).to.equal(422);
      expect(err.message).to.equal('Invalid mongo id');
      expect(ODM.findById).to.not.have.been.called;
    });
  });

  describe('Tests AbstractService.update', function () {
    const input = { goty: 'Stray' };
    it('Should succesfully return the updated object', async function () {
      const ODM = {
        updateById: Sinon.stub().resolves({ matchedCount: 1 }),
        findById: Sinon.stub().resolves({ ...dbOutput, ...input }),
      };
      const service = new MockService(ODM);

      const response = await service.update(stdOutput.id, input);

      expect(response).to.deep.equal({ ...stdOutput, ...input });
      expect(ODM.updateById).to.have.been.calledWith(stdOutput.id, input);
      expect(ODM.findById).to.have.been.calledWith(stdOutput.id);
    });

    it('Should throw an error when the requested object is not found', async function () {
      const ODM = {
        updateById: Sinon.stub().resolves({ matchedCount: 0 }),
        findById: Sinon.stub().resolves(undefined),
      };
      const service = new MockService(ODM);

      const err = await expect(
        service.update(stdOutput.id, input),
      ).to.be.rejectedWith(RestError);
      expect(err.statusCode).to.equal(404);
      expect(err.message).to.equal('Mock not found');
      expect(ODM.updateById).to.have.been.calledOnce;
      expect(ODM.findById).to.not.have.been.called;
    });

    it('Should throw an error when the id is invalid', async function () {
      const ODM = {
        updateById: Sinon.stub().resolves({ matchedCount: 0 }),
        findById: Sinon.stub().resolves(stdOutput),
      };
      const service = new MockService(ODM);

      const err = await expect(
        service.update('INVALID ID', input),
      ).to.be.rejectedWith(RestError);
      expect(err.statusCode).to.equal(422);
      expect(err.message).to.equal('Invalid mongo id');
      expect(ODM.updateById).to.not.have.been.called;
      expect(ODM.findById).to.not.have.been.called;
    });

    it('Should throw an error when an invalid value is passed', async function () {
      const ODM = {
        updateById: Sinon.stub().resolves({ matchedCount: 0 }),
        findById: Sinon.stub().resolves(stdOutput),
      };
      const service = new MockService(ODM);

      const err = await expect(
        service.update(stdOutput.id, { goty: 12345 } as never),
      ).to.be.rejectedWith(RestError);
      expect(err.statusCode).to.equal(422);
      expect(ODM.updateById).to.not.have.been.called;
      expect(ODM.findById).to.not.have.been.called;
    });
  });

  describe('Tests AbstractService.removeById', function () {
    it('Should return true when succesfully deleting an element', async function () {
      const ODM = {
        removeById: Sinon.stub().resolves({
          acknowledged: true,
          deletedCount: 1,
        }),
      };
      const service = new MockService(ODM);

      const response = await service.removeById(stdOutput.id);

      expect(response).to.be.true;
      expect(ODM.removeById).to.have.been.calledWith(stdOutput.id);
    });

    it('Should throw an error when the id is invalid', async function () {
      const ODM = {
        removeById: Sinon.stub().resolves({
          acknowledged: true,
          deletedCount: 0,
        }),
      };
      const service = new MockService(ODM);

      const err = await expect(
        service.removeById('INVALID ID'),
      ).to.be.rejectedWith(RestError);
      expect(err.statusCode).to.equal(422);
      expect(err.message).to.equal('Invalid mongo id');
      expect(ODM.removeById).to.not.have.been.called;
    });

    it('Should throw an error when the element is not found', async function () {
      const ODM = {
        removeById: Sinon.stub().resolves({
          acknowledged: true,
          deletedCount: 0,
        }),
      };
      const service = new MockService(ODM);

      const err = await expect(
        service.removeById(stdOutput.id),
      ).to.be.rejectedWith(RestError);
      expect(err.statusCode).to.equal(404);
      expect(err.message).to.equal('Mock not found');
      expect(ODM.removeById).to.have.been.called;
    });
  });
});
