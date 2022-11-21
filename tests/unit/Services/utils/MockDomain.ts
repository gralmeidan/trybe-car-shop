interface MockInterface {
  goty: string;
}

export default class MockDomain {
  public goty: string;

  constructor(obj: MockInterface) {
    this.goty = obj.goty;
  }
}
