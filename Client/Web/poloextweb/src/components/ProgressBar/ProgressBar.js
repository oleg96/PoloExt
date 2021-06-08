import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.scss';

class ProgressBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="progress-bar">
        <p className="progress-bar__percent">{this.props.percent} %</p>
        <div className="progress-bar__progress" style={{ width: `${this.props.percent}%` }}></div>
        <div className="progress-bar__nonfilled" style={{ width: `${100 - this.props.percent}%` }}></div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired
};

export default ProgressBar;
