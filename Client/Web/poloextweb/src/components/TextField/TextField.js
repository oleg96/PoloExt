import React, { Component } from 'react';
import Button from '../Button/Button.js';
import PropTypes from 'prop-types';
import './TextField.scss';

class TextField extends Component {

  constructor(props) {
    super(props);

    this.state = {
      buttonText: 'Show',
      visible: false,
      type: props.type
    };

    this.onChangeVisibilityClick = this.onChangeVisibilityClick.bind(this);
  }

  onChangeVisibilityClick(ev) {

    this.setState((state) => ({
      visible: !state.visible,
      buttonText: !state.visible === true ? 'Hide' : 'Show',
      type: this.props.type === 'password' ? !state.visible === true ? 'text' : 'password' : this.props.type
    }));

    ev.preventDefault();
  }

  render() {

    return (
      <div className="fullWidth relative">
        <input {...this.props.input} id={this.props.id} type={this.state.type} placeholder={this.props.placeholder} className={`${this.props.className} fullWidth`}></input>
        {this.props.type === 'password' ? <Button className="buttonShow button__danger button__danger--small" text={this.state.buttonText} onClick={this.onChangeVisibilityClick} /> : <div className="invisible"></div>}
        {this.props.error ? <p className="textField__error">{this.props.error}</p> : <div className="invisible"></div>}
      </div>
    );
  }
}

TextField.propTypes = {
  type: PropTypes.string.isRequired
};

export default TextField;
