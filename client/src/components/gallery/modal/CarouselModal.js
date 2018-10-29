import React, { Component } from 'react';
import ReactModal from 'react-modal';
import $ from 'jquery';

import '../../../lib/modal_styles.css';

import { exit } from '../../../lib/svg';
import ExitBtn from './ExitBtn';
import Carousel from './Carousel';
import Captions from './Captions'

class CarouselModal extends Component {

  constructor() {
    super();

    this.state = {
      active: 0
    }
  }

  handleCarouselTurn (type) {
    const change = type === 'next' ? 1 : -1
    this.setState({
      active: this.state.active + change 
    })
  }

  render() {

    var carouselWidth = window.innerWidth >= 1036 ? 1036 : window.innerWidth;
    const { handleCloseModal, showModal, imgs, activeImg } = this.props;

    return (
      <ReactModal isOpen={this.props.showModal} className="Modal">
        <ExitBtn handleCloseModal={handleCloseModal}/>
        <Carousel carouselWidth={carouselWidth} imgs={imgs} handleCarouselTurn={this.handleCarouselTurn.bind(this)} active={this.state.active}/>
        <Captions carouselWidth={carouselWidth} id="Captions" imgs={imgs} active={this.state.active}/>
      </ReactModal>
    );
  }
}

export default CarouselModal;

//<Captions carouselWidth={carouselWidth} id="Captions" imgs={imgs}/>