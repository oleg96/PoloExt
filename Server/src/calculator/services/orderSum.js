import { Calculator } from '../../calculator/index.js';

export default (userid) => {

  const promise = Calculator.findOne({ userId: userid }).exec();

  return promise.then(function (calculator) {

    if (!calculator) {
      const result = { success: false, message: 'Get calculator order sum failed. Credentials not found.' };

      throw result;
    } else if (calculator) {
      return {
        success: true,
        orderSum: calculator.orderSum
      }
    }
  });
};
