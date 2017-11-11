import React, { Component } from 'react';
import { Input } from 'react-text-input';
import './styles/InputForm.css';

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      value: "",
      valueType: null,
      width: 0,
    })
  }

  onChangeValue = (e) => {
    this.setState({
        value: e.target.value
    });
  }

  render() {
    return (
      <Input className="text-input"
        type="input"
        value={this.state.value}
        disabled={false}
        fitLineLength={false}
        onChange={this.onChangeValue}/>
    )
  }
}

export default InputForm
