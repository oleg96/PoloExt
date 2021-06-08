import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import login from '../../actions/login.js';
import { connect } from 'react-redux';
import TextField from '../TextField/TextField.js';
import Button from '../Button/Button.js';
import Label from '../Label/Label.js';
import setMessage from '../../actions/setMessage.js';
import validate from '../../validators/inputValidate.js';
import PropTypes from 'prop-types';
import './LoginForm.scss';

class LoginForm extends Component {

  onSubmit(values) {

    this.props.login(values.email, values.password)
      .then(response => {
        this.props.setMessage(response.message, true);
        this.props.history.push('/overview');
      })
      .catch(error => {
        this.props.setMessage(error.message, true);
      });
  }

  renderTextField = ({ input, name, placeholder, className, meta: { error } }) => <TextField input={input} type="text" name={name} placeholder={placeholder} className={className} error={error} />;

  renderPasswordTextField = ({ input, name, placeholder, className, meta: { error } }) => <TextField input={input} type="password" name={name} placeholder={placeholder} className={className} error={error} />;

  render() {

    return (
      <div>
        <div className="emptyBlock"></div>
        <div className="centered">
          <div className="loginForm">
            <Label className="label__name" text="Login" />
            <form className="loginForm__form" onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
              <div className="flexRow">
                <Label className="label__common" text="Email" />
                <Field
                  name="email"
                  placeholder="Email"
                  className="textField"
                  component={this.renderTextField}
                />
              </div>
              <div className="flexRow">
                <Label className="label__common" text="Password" />
                <Field
                  name="password"
                  placeholder="Password"
                  className="textField"
                  component={this.renderPasswordTextField}
                />
              </div>
              <Button className="button__primary" text="Login" type="submit" iconName="input" hasPadding="true" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const formData = {
  form: 'LoginForm',
  fields: ['email', 'password'],
  validate
};

const mapDispatchToProps = {
  login: login,
  setMessage: setMessage
};

LoginForm.propTypes = {
  setMessage: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(reduxForm(formData)(LoginForm));
