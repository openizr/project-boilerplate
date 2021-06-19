/**
 * multiparty mock.
 */

/* eslint-disable class-methods-use-this, @typescript-eslint/no-explicit-any */

class Form {
  on(eventName: string, callback: (...args: any) => void): void {
    setImmediate(() => {
      if (eventName === 'error' && process.env.MUTIPARTY_ERROR_FIELD_TOO_LARGE === 'true') {
        callback({ message: 'maxFieldsSize' });
      } else if (eventName === 'error' && process.env.MUTIPARTY_ERROR_TOO_MANY_FIELDS === 'true') {
        callback({ message: 'maxFields' });
      } else if (eventName === 'error' && process.env.MUTIPARTY_ERROR_MISSING_HEADER === 'true') {
        callback({ message: 'missing content-type header' });
      } else if (eventName === 'error' && process.env.MUTIPARTY_ERROR_OTHER === 'true') {
        callback(new Error('other error'));
      } else if (eventName === 'part') {
        callback({
          on: (partEventName: string, partCallback: (...args: any) => void): void => {
            if (partEventName !== 'error') {
              partCallback({ length: 100 });
            }
          },
          headers: { 'content-type': 'image/png' },
        });
      } else if (eventName === 'field') {
        callback();
      } else if (eventName !== 'error') {
        setTimeout(callback);
      }
    });
  }

  parse(): null {
    return null;
  }
}
export default {
  Form,
};
