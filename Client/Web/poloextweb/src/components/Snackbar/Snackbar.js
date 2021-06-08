import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Snackbar.scss';

class Snackbar extends Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {

    if (this.props.open) {
      setTimeout(() => this.props.onClose(), this.props.autoHideDuration)
    }
  }

  render() {

    if (this.props.open) {
      return (
        <div className="snackbar flexRow fullWidth">
          <p>{this.props.message}</p>
        </div>
      );
    } else {
      return (
        <div className="snackbar--invisible flexRow fullWidth"></div>
      );
    }
  }
}

Snackbar.propTypes = {
  autoHideDuration: PropTypes.number.isRequired
};

export default Snackbar;
