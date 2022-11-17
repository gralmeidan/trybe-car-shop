import Sinon from 'sinon';
import { expect } from 'chai';
import ICar from '../../../src/Interfaces/ICar';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/car.service';
import Car from '../../../src/Domains/Car';

describe('Unit tests for CarService', function () {
  it('Should successfully insert into the database', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput = new Car({
      ...carInput,
      id: '6348513f34c397abcad040b2',
      status: false,
    });

    const odm = {
      create: Sinon.stub().resolves(carOutput),
    } as unknown as CarODM;
    const service = new CarService(odm);

    const response = await service.insert(carInput);

    expect(response).to.deep.equal(carOutput);
  });
});
