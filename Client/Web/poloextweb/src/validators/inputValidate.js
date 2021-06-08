const validate = values => {

  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or longer';
  }
  if (!values.oldPassword) {
    errors.oldPassword = 'Required';
  } else if (values.oldPassword.length < 6) {
    errors.oldPassword = 'Must be 6 characters or longer';
  }
  if (!values.newPassword) {
    errors.newPassword = 'Required';
  } else if (values.newPassword.length < 6) {
    errors.newPassword = 'Must be 6 characters or longer';
  }
  if (!values.text) {
    errors.text = 'Required';
  }

  return errors;
};

export default validate;
