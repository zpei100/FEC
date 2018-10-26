import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { exit } from '../../lib/svg';

class CarouselModal extends Component {
  render() {

    const {handleCloseModal, showModal, imgs, activeImg } = this.props;

    return (
      <ReactModal
        isOpen={this.props.showModal}
        className="Modal"
      >
      <div className="exit h-100"><button className="exit-button mt-3 mr-4 border-0" onClick={handleCloseModal}>{exit}</button></div>
      <div className="carousel w-100 h-100 bg-danger d-flex justify-content-center">
        <img className="carousel-image" src={imgs[2]} />
      </div>


      
      </ReactModal>
    );
  }
}

export default CarouselModal;