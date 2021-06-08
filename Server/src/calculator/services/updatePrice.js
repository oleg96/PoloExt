import { Calculator } from '../models/index.js';

export default (userId, price) => {

  const promise = Calculator.findOne({ userId: userId }).exec();

  return promise.then(function (calculator) {

    if (!calculator) {
      const newCalculator = new Calculator({
        userId,
        price
      });

      return newCalculator.save();
    } else if (calculator) {
      return Calculator.findByIdAndUpdate(calculator.id, {
        $set: {
          price
        }
      },
        {
          new: true
        }
      );
    }
  });
};
