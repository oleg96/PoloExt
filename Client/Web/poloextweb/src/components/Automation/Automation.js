import React, { Component } from 'react';
import Button from '../Button/Button.js';
import { connect } from 'react-redux';
import getAutomation from '../../actions/getAutomation.js';
import updateAutomation from '../../actions/updateAutomation.js';
import setMessage from '../../actions/setMessage.js';
import setEventsVisible from '../../actions/setEventsVisible.js';
import Auth from '../../security/auth.js';
import PropTypes from 'prop-types';
import { showNotification } from '../App/App.js';

class Automation extends Component {

  isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      isEnabled: false,
      events: [],
      eventsLength: 0
    };

    this.onUpdateAutomationClick = this.onUpdateAutomationClick.bind(this);
    this.onEventsVisibleClick = this.onEventsVisibleClick.bind(this);
  }

  updateAutomation() {

    this.props.getAutomation()
      .then(automation => {

        if (this.isMounted) {
          this.setState({
            isEnabled: automation.isEnabled,
            events: automation.events
          }, () => {
            if (!this.state.eventsLength) {
              this.setState({
                eventsLength: automation.events.length
              });

              return;
            }

            if (this.state.eventsLength < this.state.events.length) {
              showNotification(this.state.events[this.state.events.length - 1].message);
              this.setState({
                eventsLength: automation.events.length
              });
            }
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

  onUpdateAutomationClick() {

    this.props.updateAutomation(!this.state.isEnabled)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateAutomation();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onEventsVisibleClick() {

    this.props.setEventsVisible(!this.props.eventsVisible);
  }

  componentDidMount() {

    this.isMounted = true;

    this.updateAutomation();

    this.timerUpdate = setInterval(() => this.updateAutomation(), 10000);
  }

  componentWillUnmount() {

    this.isMounted = false;

    clearInterval(this.timerUpdate);
  }

  render() {

    if (this.state.isEnabled) {
      return (
        <div className="flexWrap">
          <Button className="button__warning" text="" onClick={this.onUpdateAutomationClick} iconName="gavel" />
          <Button className="button__primary" text="" onClick={this.onEventsVisibleClick} iconName="notifications" />
        </div>
      );
    } else {
      return (
        <div className="flexWrap">
          <Button className="button__primary" text="" onClick={this.onUpdateAutomationClick} iconName="gavel" />
          <Button className="button__primary" text="" onClick={this.onEventsVisibleClick} iconName="notifications" />
        </div>
      );
    }
  }
}

const mapDispatchToProps = {
  setMessage: setMessage,
  getAutomation: getAutomation,
  updateAutomation: updateAutomation,
  setEventsVisible: setEventsVisible
};

Automation.propTypes = {
  setMessage: PropTypes.func.isRequired,
  getAutomation: PropTypes.func.isRequired,
  updateAutomation: PropTypes.func.isRequired,
  setEventsVisible: PropTypes.func.isRequired
};

const AutomationConnected = connect(null, mapDispatchToProps)(Automation);

export default AutomationConnected;
