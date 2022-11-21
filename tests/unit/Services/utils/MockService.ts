/* eslint-disable max-classes-per-file */
import AbstractODM from '../../../../src/Models/AbstractODM';
import AbstractService from '../../../../src/Services/abstract.service';
import CreateMockODM from './CreateMockODM';
import MockDomain from './MockDomain';

interface MockInterface {
  goty: string;
}

export default class MockService extends AbstractService<
MockInterface,
MockDomain
> {
  constructor(StubsODM: Partial<AbstractODM<MockInterface>>) {
    const MockODM = CreateMockODM<MockInterface>(StubsODM);

    super(MockODM, MockDomain, 'Mock');
  }
}
