import { Automation } from '../models/index.js';

export default (userId, events) => {

  const promise = Automation.findOne({ userId: userId }).exec();

  return promise.then(function (automation) {

    if (!automation) {
      const newAutomation = new Automation({
        userId,
        events
      });

      return newAutomation.save();
    } else if (automation) {
      return Automation.findByIdAndUpdate(automation.id, {
        $push: {
          events
        }
      });
    }
  });
};
