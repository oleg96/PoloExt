import React, { Component } from 'react';
import Label from '../Label/Label.js';
import Button from '../Button/Button.js';
import Automation from '../Automation/Automation.js';
import { NavLink } from 'react-router-dom';
import Auth from '../../security/auth.js';
import Icon from '../../public/icon.png';
import './AppBar.scss';

class AppBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      opened: false
    }

    this.onNavClick = this.onNavClick.bind(this);
  }

  logOut() {

    Auth.deauthenticateUser();
  }

  getButtonClass(pathname) {

    return pathname === this.props.pathname ? 'button__navigation button__navigation__selected--true' : 'button__navigation button__navigation__selected--false';
  }

  onNavClick() {

    this.setState((state) => ({
      opened: !state.opened
    }));
  }

  render() {

    if (Auth.isUserAuthenticated()) {
      if (this.state.opened) {
        return (
          <div>
            <div className="appBar">
              <div className="flex" onClick={this.onNavClick}>
                <img src={Icon} className="appBar__icon" alt="PoloExt"></img>
                <Label text="PoloExt" className="appBar__name" />
              </div>
              <div className="appBar__login">
                <Automation />
                <a href="/logout" className="navLink"><Button className="button__primary" text="" onClick={this.logOut} iconName="power_settings_new" /></a>
              </div>
            </div>
            <div className="appBar__navigation">
              <NavLink to="/overview" className="navLink"><Button className={this.getButtonClass('/overview')} onClick={this.onNavClick} text="Overview" /></NavLink>
              <NavLink to="/calculator" className="navLink"><Button className={this.getButtonClass('/calculator')} onClick={this.onNavClick} text="Calculator" /></NavLink>
              <NavLink to="/poloniex" className="navLink"><Button className={this.getButtonClass('/poloniex')} onClick={this.onNavClick} text="Poloniex" /></NavLink>
              <NavLink to="/nicehash" className="navLink"><Button className={this.getButtonClass('/nicehash')} onClick={this.onNavClick} text="Nicehash" /></NavLink>
              <NavLink to="/credentials" className="navLink"><Button className={this.getButtonClass('/credentials')} onClick={this.onNavClick} text="Credentials" /></NavLink>
            </div>
            <div className="appBar__cover" onClick={this.onNavClick}></div>
          </div>
        );
      } else {
        return (
          <div>
            <div className="appBar">
              <div className="flex" onClick={this.onNavClick}>
                <img src={Icon} className="appBar__icon" alt="PoloExt"></img>
                <Label text="PoloExt" className="appBar__name" />
              </div>
              <div className="appBar__login">
                <Automation />
                <a href="/logout" className="navLink"><Button className="button__primary" text="" onClick={this.logOut} iconName="power_settings_new" /></a>
              </div>
            </div>
            <div className="appBar__navigation--invisible">
              <NavLink to="/overview" className="navLink"><Button className={this.getButtonClass('/overview')} text="Overview" /></NavLink>
              <NavLink to="/calculator" className="navLink"><Button className={this.getButtonClass('/calculator')} text="Calculator" /></NavLink>
              <NavLink to="/poloniex" className="navLink"><Button className={this.getButtonClass('/poloniex')} text="Poloniex" /></NavLink>
              <NavLink to="/nicehash" className="navLink"><Button className={this.getButtonClass('/nicehash')} text="Nicehash" /></NavLink>
              <NavLink to="/credentials" className="navLink"><Button className={this.getButtonClass('/credentials')} text="Credentials" /></NavLink>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="appBar">
          <div className="flex">
            <img src={Icon} className="appBar__icon" alt="PoloExt"></img>
            <Label text="PoloExt" className="appBar__name" />
          </div>
        </div>
      );
    }
  }
}

export default AppBar;
