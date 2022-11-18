import IMotorcycle from '../../src/Interfaces/IMotorcycle';

const MotorcycleMocks = {
  input: {
    validMotorcycle: {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.0,
      category: 'Street',
      engineCapacity: 600,
    },
  },
  output: {
    motorcycleOutput: {
      _id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.0,
      category: 'Street',
      engineCapacity: 600,
    },
    motorcyclesOutput: [
      {
        _id: '634852326b35b59438fbea2f',
        model: 'Honda Cb 600f',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.0,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        _id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.9,
        category: 'Street',
        engineCapacity: 1000,
      },
    ],
  },
} as {
  input: Record<string, IMotorcycle>;
  output: {
    motorcycleOutput: Required<Omit<IMotorcycle, 'id'>>;
    motorcyclesOutput: IMotorcycle[];
  };
};

export default MotorcycleMocks;
