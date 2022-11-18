import {
  Model,
  Schema,
  model,
  models,
  UpdateWriteOpResult,
  UpdateQuery,
} from 'mongoose';

export default abstract class ODM<T> {
  protected model: Model<T>;

  constructor(protected schema: Schema<T>, name: string) {
    this.model = models[name] || model(name, schema);
  }

  public async create(object: T): Promise<T> {
    return this.model.create({ ...object });
  }

  public async getAll(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findOne({ _id: id });
  }

  public async updateById(
    id: string,
    options: UpdateQuery<T>,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateOne({ _id: id }, options);
  }
}
