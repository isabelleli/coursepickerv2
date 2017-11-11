import React, { Component } from 'react';
import { determineTimeConflicts } from './constants';

class UserBlocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduledBlocks: [],
    };
  }

  handleSelection = (block) => {
    if (this.canAdd()) {
      this.setState({
        scheduledBlocks: [...this.state.scheduledBlocks, block],
      });
    }
  }

  handleRemovedBlock = (newBlocksList) => {
    this.setState({
      scheduledBlocks: newBlocksList
    })
  }

  canAdd = (block) => {
    return (
        determineTimeConflicts(this.props.scheduled, block)
    )
  }

  render() {
    return (
      <div> hi </div>
    )
  }
}

export default UserBlocks
