import { expect } from 'chai';
import CarService from '../../../src/Services/CarService';
import AbstractService from '../../../src/Services/AbstractService';

describe('Unit tests for CarService', function () {
  it('Should be an instance of AbstractService', function () {
    expect(CarService.prototype instanceof AbstractService).to.be.true;
  });
});
