import { Automation } from '../../automation/index.js';

export default (userid) => {

  const promise = Automation.findOne({ userId: userid }).exec();

  return promise.then(function (automation) {

    if (!automation) {
      const result = { success: false, message: 'Get automation failed. Credentials not found.' };

      throw result;
    } else if (automation) {
      return {
        success: true,
        isEnabled: automation.isEnabled,
        events: automation.events ? automation.events.filter(event => event.success) : []
      }
    }
  });
};
