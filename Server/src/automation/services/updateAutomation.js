import { Automation } from '../models/index.js';

export default (userId, isEnabled) => {

  const promise = Automation.findOne({ userId: userId }).exec();

  return promise.then(function (automation) {

    if (!automation) {
      const newAutomation = new Automation({
        userId,
        isEnabled
      });

      return newAutomation.save();
    } else if (automation) {
      return Automation.findByIdAndUpdate(automation.id, {
        $set: {
          isEnabled
        }
      },
        {
          new: true
        }
      );
    }
  });
};
