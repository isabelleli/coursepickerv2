import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Form from './ModalForm.js';
import './styles/Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  render () {
    return (
      <div>
        {/* maybe change so that the buttons are in userblocks */}
        <button className="create-button"
          onClick={this.handleOpenModal}>Add Own Block</button>
        <ReactModal
          className="modal"
           isOpen={this.state.showModal}
           >
          <Form />
          <button className="close-button"
            onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}

export default Modal
