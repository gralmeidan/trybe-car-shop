import { expect } from 'chai';
import MotorcycleService from '../../../src/Services/motorcycle.service';
import AbstractService from '../../../src/Services/abstract.service';

describe('Unit tests for MotorcycleService', function () {
  it('Should be an instance of AbstractService', function () {
    expect(MotorcycleService.prototype instanceof AbstractService).to.be.true;
  });
});
