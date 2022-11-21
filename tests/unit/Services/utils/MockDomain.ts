interface MockInterface {
  _id?: string;
  goty: string;
}

export default class MockDomain {
  public goty: string;
  public id?: string;

  constructor(obj: MockInterface) {
    this.id = obj._id;
    this.goty = obj.goty;
  }
}
