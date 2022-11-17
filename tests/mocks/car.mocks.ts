import Car from '../../src/Domains/Car';
import ICar from '../../src/Interfaces/ICar';

const CarMocks = {
  input: {
    validCar: {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    },
  },
  output: {
    carOutput: new Car({
      model: 'Marea',
      year: 2002,
      color: 'Black',
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
      id: '6348513f34c397abcad040b2',
      status: false,
    }),
  },
} as {
  input: Record<string, ICar>;
  output: Record<string, Car>;
};

export default CarMocks;
