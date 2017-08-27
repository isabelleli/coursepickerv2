import React, { Component } from 'react';
import './reportbutton.css';

class Report extends Component {
  handleClick = () => window.location.assign('https://goo.gl/FvoS8z');

  render() {
    return (
      <button onClick={this.handleClick}
      className="button"> Report Issues </button>
    );
  };
}

export default Report;
