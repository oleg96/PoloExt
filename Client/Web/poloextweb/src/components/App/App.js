import React, { Component } from 'react';
import AppBar from '../AppBar/AppBar.js'
import Snackbar from '../Snackbar/Snackbar.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import setMessage from '../../actions/setMessage.js';
import setEventsVisible from '../../actions/setEventsVisible.js';
import PropTypes from 'prop-types';
import Icon from '../../public/icon.png';
import AutomationEvents from '../AutomationEvents/AutomationEvents.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.onEventsVisibleClick = this.onEventsVisibleClick.bind(this);
    this.grantNotificationPermission();
  }

  grantNotificationPermission = () => {

    if (!('Notification' in window)) {
      alert('This browser does not support system notifications');

      return;
    }

    if (Notification.permission !== 'denied' || Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  render() {

    return (
      <div>
        <AppBar pathname={this.props.location.pathname} />
        <AutomationEvents isShown={this.props.eventsVisible === undefined ? false : this.props.eventsVisible} events={this.props.events === undefined ? [] : this.props.events} clickHandler={this.onEventsVisibleClick} />
        <div>
          {this.props.children}
        </div>
        <Snackbar open={this.props.open === undefined ? false : this.props.open} message={this.props.message} autoHideDuration={4000}
          onClose={this.handleClose} />
      </div>
    );
  }

  handleClose() {

    this.props.setMessage('', false);
  }

  onEventsVisibleClick() {

    this.props.setEventsVisible(!this.props.eventsVisible);
  }
}

export const showNotification = message => {

  const title = 'PoloExt Automation';
  const body = message;

  new Notification(title, { body, icon: `${Icon}` });
};

function mapStateToProps(state) {

  return {
    message: state.message.message,
    open: state.message.open,
    eventsVisible: state.eventsVisible.eventsVisible,
    events: state.automation.events
  }
}

const mapDispatchToProps = {
  setMessage: setMessage,
  setEventsVisible: setEventsVisible
};

App.propTypes = {
  setMessage: PropTypes.func.isRequired,
  setEventsVisible: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
