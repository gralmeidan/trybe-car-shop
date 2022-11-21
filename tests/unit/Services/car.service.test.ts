import { expect } from 'chai';
import CarService from '../../../src/Services/car.service';
import AbstractService from '../../../src/Services/abstract.service';

describe('Unit tests for CarService', function () {
  it('Should be an instance of AbstractService', function () {
    expect(CarService.prototype instanceof AbstractService).to.be.true;
  });
});
