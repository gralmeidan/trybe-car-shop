/* eslint-disable max-classes-per-file */
import Sinon from 'sinon';
import AbstractService from '../../../../src/Services/abstract.service';
import CreateMockODM from './CreateMockODM';
import MockDomain from './MockDomain';

interface MockInterface {
  _id?: string;
  goty: string;
}

export default class MockService extends AbstractService<
MockInterface,
MockDomain
> {
  constructor(StubsODM: Record<string, Sinon.SinonStub>) {
    const MockODM = CreateMockODM<MockInterface>(StubsODM);

    super(MockODM, MockDomain, 'Mock');
  }
}
