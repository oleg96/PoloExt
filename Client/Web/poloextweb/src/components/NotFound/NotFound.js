import React, { Component } from 'react';
import Label from '../Label/Label.js';

class NotFound extends Component {

  render() {

    return (
      <div className="flexWrap">
        <div className="emptyBlock"></div>
        <div className="block">
          <Label className="label__red--name" text="Not found" />
        </div>
      </div>
    )
  }
}

export default NotFound;