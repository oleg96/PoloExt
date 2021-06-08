import React, { Component } from 'react';
import './Icon.scss';

class Icon extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    if (this.props.iconName) {
      return <i className={`material-icons icon_padding--${this.props.hasPadding === undefined ? false : this.props.hasPadding}`}>{this.props.iconName}</i>;
    }

    return '';
  }
}

export default Icon;
