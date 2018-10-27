import React, { Component } from 'react';
import ReactModal from 'react-modal';

import { exit } from '../../lib/svg';
import { next, prev } from '../../lib/svg';

class CarouselModal extends Component {
  render() {
    const { handleCloseModal, showModal, imgs, activeImg } = this.props;

    return (
      <ReactModal isOpen={this.props.showModal} className="Modal">
        <div className="exit h-100">
          <button
            className="exit-button mt-3 mr-4 border-0"
            onClick={handleCloseModal}
          >
            {exit}
          </button>
        </div>

        <div className="carousel slide" id="modal-carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block m-auto" src={imgs[0]} />
            </div>
            <div className="carousel-item">
              <img className="d-block m-auto" src={imgs[1]} />
            </div>
            <div className="carousel-item">
              <img className="d-block m-auto" src={imgs[2]} />
            </div>

            <a
              className="carousel-control-prev"
              href="#modal-carousel"
              role="button"
              data-slide="prev"
              
            >
              {prev}
            </a>

            <a
              className="carousel-control-next"
              href="#modal-carousel"
              role="button"
              data-slide="next"
            >
              {next}
            </a>
          </div>
        </div>

        <div className="prompt container" style={{overflow: 'hidden'}}>
          {this.props.imgs.map(img => <img src={img}></img>)}
        </div>
      </ReactModal>
    );
  }
}

export default CarouselModal;
