import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Label.scss';

class Label extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return <p className={this.props.className}>{this.props.text}</p>;
  }
}

Label.propTypes = {
  text: PropTypes.string.isRequired
};

export default Label;
