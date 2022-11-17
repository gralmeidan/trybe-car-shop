import { Model, Schema, model, models } from 'mongoose';

export default abstract class ODM<T> {
  protected model: Model<T>;

  constructor(protected schema: Schema<T>, name: string) {
    this.model = models[name] || model(name, schema);
  }

  public async create(object: T): Promise<T> {
    return this.model.create({ ...object });
  }
}