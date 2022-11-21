import RestError from '../Errors/RestError';
import AbstractODM from '../Models/AbstractODM';

export default abstract class AbstractService<Interface, DomainType> {
  constructor(
    protected ODM: {
      new (): AbstractODM<Interface>;
    },
    protected Domain: {
      new (obj: Interface): DomainType;
    },
    protected name: string,
  ) {}

  protected validateId = (id: string) => {
    if (!/^[a-f\d]{24}$/i.test(id)) {
      throw new RestError(422, 'Invalid mongo id');
    }
  };

  protected createDomain = (obj: Interface): DomainType => new this.Domain(obj);

  public insert = async (obj: Interface) => {
    const odm = new this.ODM();
    const response = await odm.create(obj);
    return this.createDomain(response);
  };

  public getAll = async () => {
    const odm = new this.ODM();
    const response = await odm.getAll();
    return response.map(this.createDomain);
  };

  public findById = async (id: string) => {
    this.validateId(id);

    const odm = new this.ODM();
    const response = await odm.findById(id);

    if (!response) {
      throw new RestError(404, `${this.name} not found`);
    }

    return this.createDomain(response);
  };

  public update = async (
    id: string,
    options: Partial<Omit<Interface, '_id'>>,
  ) => {
    this.validateId(id);

    const odm = new this.ODM();
    const updateResult = await odm.updateById(id, options);

    if (!updateResult.matchedCount) {
      throw new RestError(404, `${this.name} not found`);
    }

    return this.findById(id);
  };

  public removeById = async (id: string) => {
    this.validateId(id);

    const odm = new this.ODM();
    const deleteResult = await odm.removeById(id);

    if (!deleteResult.deletedCount) {
      throw new RestError(404, `${this.name} not found`);
    }

    return true;
  };
}
