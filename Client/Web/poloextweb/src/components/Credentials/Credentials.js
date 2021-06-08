import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Label from '../Label/Label.js';
import TextField from '../TextField/TextField.js';
import Button from '../Button/Button.js';
import { connect } from 'react-redux';
import getPoloniexCredentials from '../../actions/getPoloniexCredentials.js';
import updatePoloniexCredentials from '../../actions/updatePoloniexCredentials.js';
import getNicehashCredentials from '../../actions/getNicehashCredentials.js';
import updateNicehashCredentials from '../../actions/updateNicehashCredentials.js';
import getNicehashPoolCredentials from '../../actions/getNicehashPoolCredentials.js';
import updateNicehashPoolCredentials from '../../actions/updateNicehashPoolCredentials.js';
import updateUserCredentials from '../../actions/updateUserCredentials.js';
import setMessage from '../../actions/setMessage.js';
import validate from '../../validators/inputValidate.js';
import Auth from '../../security/auth.js';
import PropTypes from 'prop-types';

class Credentials extends Component {

  isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      publicKey: '-',
      privateKey: '-',
      apiSecret: '-',
      apiKey: '-',
      organizationId: '-',
      poolId: '-',
      poolAlgo: '-'
    };

    this.handleChange = this.handleChange.bind(this);
    this.onUpdatePoloniexCredentialsClick = this.onUpdatePoloniexCredentialsClick.bind(this);
    this.onUpdateNicehashCredentialsClick = this.onUpdateNicehashCredentialsClick.bind(this);
    this.onUpdateNicehashPoolCredentialsClick = this.onUpdateNicehashPoolCredentialsClick.bind(this);
  }

  handleChange(event) {

    event.persist();
    this.setState({ [event.target.id]: event.target.value });
  }

  updateCredentials() {

    this.props.getPoloniexCredentials()
      .then(credentials => {

        if (this.isMounted) {
          this.setState({
            publicKey: credentials.publicKey ? credentials.publicKey : '-',
            privateKey: credentials.privateKey ? credentials.privateKey : '-'
          });
        }
      })
      .catch(error => {

        this.props.setMessage(error.message, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });

    this.props.getNicehashCredentials()
      .then(credentials => {

        if (this.isMounted) {
          this.setState({
            apiSecret: credentials.apiSecret ? credentials.apiSecret : '-',
            apiKey: credentials.apiKey ? credentials.apiKey : '-',
            organizationId: credentials.organizationId ? credentials.organizationId : '-'
          });
        }
      })
      .catch(error => {

        this.props.setMessage(error.message, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });

    this.props.getNicehashPoolCredentials()
      .then(poolCredentials => {

        if (this.isMounted) {
          this.setState({
            poolId: poolCredentials.poolId ? poolCredentials.poolId : '-',
            poolAlgo: poolCredentials.poolAlgo ? poolCredentials.poolAlgo : '-'
          });
        }
      })
      .catch(error => {

        this.props.setMessage(error.message, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onUpdatePoloniexCredentialsClick() {

    this.props.updatePoloniexCredentials(this.state.publicKey, this.state.privateKey)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateCredentials();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onUpdateNicehashCredentialsClick() {

    this.props.updateNicehashCredentials(this.state.apiSecret, this.state.apiKey, this.state.organizationId)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateCredentials();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onUpdateNicehashPoolCredentialsClick() {

    this.props.updateNicehashPoolCredentials(this.state.poolId, this.state.poolAlgo)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateCredentials();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onSubmit(values) {

    this.props.updateUserCredentials(values.oldPassword, values.newPassword)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateCredentials();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  renderPasswordTextField = ({ input, name, placeholder, className, meta: { error } }) => <TextField input={input} type="password" name={name} placeholder={placeholder} className={className} error={error} />;

  componentDidMount() {

    this.isMounted = true;

    this.updateCredentials();
  }

  componentWillUnmount() {

    this.isMounted = false;
  }

  render() {

    return (
      <div className="flexWrap flexWrap__centered">
        <div className="emptyBlock"></div>
        <div className="block">
          <Label className="label__name" text="Change password" />
          <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
            <div className="flexRow">
              <Label className="label__common" text="Old password" />
              <Field
                name="oldPassword"
                placeholder="Old password"
                className="textField"
                component={this.renderPasswordTextField}
              />
            </div>
            <div className="flexRow">
              <Label className="label__common" text="New password" />
              <Field
                name="newPassword"
                placeholder="New password"
                className="textField"
                component={this.renderPasswordTextField}
              />
              <Button className="button__warning" text="Change" type="submit" disabled={this.props.isAutomationEnabled} />
            </div>
          </form>
        </div>
        <div className="block">
          <Label className="label__name" text="Poloniex credentials" />
          <div className="flexRow">
            <Label className="label__common" text="Public key" />
            <TextField input={{ value: this.state.publicKey, onChange: this.handleChange }} type="password" id="publicKey" placeholder="Public key" className="textField" />
          </div>
          <div className="flexRow">
            <Label className="label__common" text="Private key" />
            <TextField input={{ value: this.state.privateKey, onChange: this.handleChange }} type="password" id="privateKey" placeholder="Private key" className="textField" />
            <Button className="button__warning" text="Update" onClick={this.onUpdatePoloniexCredentialsClick} disabled={this.props.isAutomationEnabled} />
          </div>
        </div>
        <div className="block">
          <Label className="label__name" text="Nicehash credentials" />
          <div className="flexRow">
            <Label className="label__common" text="Organization Id" />
            <TextField input={{ value: this.state.organizationId, onChange: this.handleChange }} type="password" id="organizationId" placeholder="Organization Id" className="textField" />
          </div>
          <div className="flexRow">
            <Label className="label__common" text="API key" />
            <TextField input={{ value: this.state.apiKey, onChange: this.handleChange }} type="password" id="apiKey" placeholder="API key" className="textField" />
          </div>
          <div className="flexRow">
            <Label className="label__common" text="API secret" />
            <TextField input={{ value: this.state.apiSecret, onChange: this.handleChange }} type="password" id="apiSecret" placeholder="API secret" className="textField" />
            <Button className="button__warning" text="Update" onClick={this.onUpdateNicehashCredentialsClick} disabled={this.props.isAutomationEnabled} />
          </div>
        </div>
        <div className="block">
          <Label className="label__name" text="Nicehash pool credentials" />
          <div className="flexRow">
            <Label className="label__common" text="Pool Id" />
            <TextField input={{ value: this.state.poolId, onChange: this.handleChange }} type="text" id="poolId" placeholder="Pool name" className="textField" />
          </div>
          <div className="flexRow">
            <Label className="label__common" text="Pool algo" />
            <TextField input={{ value: this.state.poolAlgo, onChange: this.handleChange }} type="text" id="poolAlgo" placeholder="Pool password" className="textField" />
            <Button className="button__warning" text="Update" onClick={this.onUpdateNicehashPoolCredentialsClick} disabled={this.props.isAutomationEnabled} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {

  return {
    isAutomationEnabled: state.automation.isEnabled
  }
}

const formData = {
  form: 'ChangePasswordForm',
  fields: ['oldPassword', 'newPassword'],
  validate
};

const mapDispatchToProps = {
  setMessage: setMessage,
  getPoloniexCredentials: getPoloniexCredentials,
  updatePoloniexCredentials: updatePoloniexCredentials,
  getNicehashCredentials: getNicehashCredentials,
  updateNicehashCredentials: updateNicehashCredentials,
  getNicehashPoolCredentials: getNicehashPoolCredentials,
  updateNicehashPoolCredentials: updateNicehashPoolCredentials,
  updateUserCredentials: updateUserCredentials
};

Credentials.propTypes = {
  setMessage: PropTypes.func.isRequired,
  getPoloniexCredentials: PropTypes.func.isRequired,
  updatePoloniexCredentials: PropTypes.func.isRequired,
  getNicehashCredentials: PropTypes.func.isRequired,
  updateNicehashCredentials: PropTypes.func.isRequired,
  getNicehashPoolCredentials: PropTypes.func.isRequired,
  updateNicehashPoolCredentials: PropTypes.func.isRequired,
  updateUserCredentials: PropTypes.func.isRequired
};

const CredentialsConnected = connect(mapStateToProps, mapDispatchToProps)(reduxForm(formData)(Credentials));

export default CredentialsConnected;
