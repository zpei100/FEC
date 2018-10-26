import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Slider from 'react-slick';
import $ from 'jquery';

import { exit } from '../../lib/svg';
import Arrow from '../carousel/Arrow';
import CarouselImage from './CarouselImage';

class CarouselModal extends Component {
  componentDidMount() {
    console.log($('.carousel'));
  }

  render() {
    const { handleCloseModal, showModal, imgs, activeImg } = this.props;
    const settings_one = {
      infinite: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      initialSlide: activeImg,
      className: 'testing',
      useCSS: false,
      nextArrow: <Arrow direction="+" />,
      prevArrow: <Arrow direction="-" />
    };

    const settings_two = {
      infinite: true,
      slidesToScroll: 1,
      slidesToShow: 5,
      initialSlide: activeImg
    }

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

        <div className="carousel container">
          <Slider {...settings_one}>
            {imgs.map(img => (
              <CarouselImage img={img} />
            ))}
          </Slider>
        </div>

        <div className="prompt container">
          <Slider {...settings_two}>
              {imgs.map(img => (
                <img src={img}/>
              ))}
          </Slider>
        </div>
      </ReactModal>
    );
  }
}

export default CarouselModal;
