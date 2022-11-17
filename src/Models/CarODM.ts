import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import ODM from './ODM';

export default class CarODM extends ODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      id: { type: String, required: true },
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    super(schema, 'Car');
  }
}
