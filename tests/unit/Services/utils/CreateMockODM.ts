import Sinon from 'sinon';
import AbstractODM from '../../../../src/Models/AbstractODM';

export default function CreateMockODM<T>(stubs: Partial<AbstractODM<T>>) {
  class MockODM extends AbstractODM<T> {
    constructor() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      super({} as any, 'Mock' as any);

      this.create = stubs.create || Sinon.stub();
      this.getAll = stubs.getAll || Sinon.stub();
      this.findById = stubs.findById || Sinon.stub();
      this.updateById = stubs.updateById || Sinon.stub();
    }
  }

  return MockODM;
}
