import Sinon from 'sinon';
import { expect } from 'chai';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/car.service';
import CarMocks from '../../mocks/car.mocks';
import Car from '../../../src/Domains/Car';

describe('Unit tests for CarService', function () {
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
