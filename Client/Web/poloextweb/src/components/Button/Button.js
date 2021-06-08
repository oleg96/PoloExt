import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon.js';
import './Button.scss';

class Button extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return <button type={this.props.type} onClick={this.props.onClick} className={`${this.props.className} ${this.props.className}__disabled--${!!this.props.disabled}`} disabled={!!this.props.disabled}><Icon iconName={this.props.iconName} hasPadding={this.props.hasPadding} />{this.props.text}</button>;
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired
};

export default Button;
