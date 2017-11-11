import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }

  toggleCheckbox = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  render() {
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" onChange={this.toggleCheckbox} />
        </label>
      </div>
    )
  }
}

export default Checkbox
