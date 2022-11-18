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
    carOutput: {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
      _id: '6348513f34c397abcad040b2',
      status: false,
    },
    carsOutput: [
      {
        _id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        _id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ],
  },
} as {
  input: Record<string, Omit<ICar, 'id'>>;
  output: {
    carOutput: Required<Omit<ICar, 'id'>>;
    carsOutput: ICar[];
  };
};

export default CarMocks;
