import Joi from 'joi';
import RestError from '../Errors/RestError';
import AbstractODM from '../Models/AbstractODM';

export default abstract class AbstractService<Interface, DomainType> {
  protected insertSchema: Joi.ObjectSchema;
  protected updateSchema: Joi.ObjectSchema;

  constructor(
    protected ODM: {
      new (): AbstractODM<Interface>;
    },
    protected Domain: {
      new (obj: Interface): DomainType;
      Schema: Joi.ObjectSchema;
    },
    protected name: string,
  ) {
    // Forks Domain.Schema to have one where everything is required and other where
    // everything is optional.
    const requiredKeys = Object.keys(Domain.Schema.describe().keys).filter(
      (key) => key !== 'status',
    );

    this.insertSchema = Domain.Schema.fork(requiredKeys, (el) => el.required());
    this.updateSchema = Domain.Schema.min(1);
  }

  protected validateObjInput = (
    obj: Partial<Interface>,
    schema: Joi.ObjectSchema,
  ) => {
    const { value, error } = schema.validate(obj);
    if (error) {
      throw new RestError(422, error.message);
    }

    return value;
  };

  protected validateId = (id: string) => {
    if (!/^[a-f\d]{24}$/i.test(id)) {
      throw new RestError(422, 'Invalid mongo id');
    }
  };

  protected createDomain = (obj: Interface): DomainType => new this.Domain(obj);

  public insert = async (obj: Interface) => {
    const value = this.validateObjInput(obj, this.insertSchema);
    const odm = new this.ODM();

    const response = await odm.create(value);
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

  public update = async (id: string, obj: Partial<Omit<Interface, '_id'>>) => {
    const value = this.validateObjInput(
      obj as Partial<Interface>,
      this.updateSchema,
    );
    this.validateId(id);

    const odm = new this.ODM();
    const updateResult = await odm.updateById(id, value);

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
