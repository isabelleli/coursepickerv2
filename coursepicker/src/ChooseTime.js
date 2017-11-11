import React, { Component } from 'react';
import InputForm from './InputForm.js'; //should prevent incorrect values
import moment from 'moment';
import './styles/ChooseTime.css';

const format = 'h:mm a';
class ChooseTime extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      value: moment().hour(0).minute(0)
    })
  }

  onChange = (value) => {
    this.setState({
      value: value.format(format)
    })
  }

  render() {
    return(
      <div className="time-picker">
        <InputForm />
      </div>
    )
  }
}

export default ChooseTime
