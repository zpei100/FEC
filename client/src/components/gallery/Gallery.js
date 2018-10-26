import React, { Component } from 'react';
import $ from 'jquery';

import GalleryImage from './GalleryImage';
import CarouselModal from './CarouselModal';
import { save, share } from '../../lib/svg';
import './styles.css';

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      showModal: true,
      activeImg: 0 
    };
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    console.log(this.state.showModel)
  }

  componentDidMount() {
    $('.gallery img').hover(
      function(e) {
        const others = $(e.target)
          .parent()
          .siblings()
          .children('img')
          .not(e.target);
        $(others).stop();
        $(others).css({ opacity: 0.7, transition: 'ease-in, 1s' });
        // $(others).fadeTo(600, 0.7, 'swing') alternative
      },
      function(e) {
        const others = $(e.target)
          .parent()
          .siblings()
          .children('img')
          .not(e.target);
        $(others).stop();
        $(others).css({ opacity: 1, transition: 'ease-in, 1s' });
        // $(others).fadeTo(400, 1, 'swing');
      }
    );

    this.floatButtonWhenEntering($('.img4'));
    this.floatButtonWhenEntering($('.button-bottom'));
  }

  floatButtonWhenEntering(ele) {
    ele.hover(
      function(e) {
        $('.button-bottom').css({
          transform: 'translateY(-12px)',
          transition: 'opacity 0.2s ease-in, transform 0.35s'
        });
      },
      function(e) {
        $('.button-bottom ').css({
          transform: 'translateY(0)',
          transition: 'opacity 0.2s ease-in, transform 0.35s'
        });
      },
      function(e) {}
    );
  }

  render() {
    return (
      <div className="gallery">
        <CarouselModal handleCloseModal={this.handleCloseModal.bind(this)} showModal={this.state.showModal} imgs={this.props.imgs} activeImg={this.state.activeImg}/>

        <div className="button-top button mx-4 my-4 d-flex">
          <button className="btn btn-lg mx-3 py-1 button-text d-flex btn-light">
            <div className="mr-2 align-self-center">{share}</div>
            <div className="hide-text" style={{ lineHeight: '25px' }}>Share</div>
          </button>

          <button className="btn btn-lg py-1 button-text d-flex btn-light">
            <div className="mr-2 align-self-center">{save}</div>
            <div className="hide-text" style={{ lineHeight: '25px' }}>Save</div>
          </button>
        </div>

        <div className="button-bottom button mx-4 my-4">
          <button
            onClick={this.handleOpenModal.bind(this)}
            className="btn btn-lg py-1 button-text btn-light"
          >
            View Photos
          </button>
        </div>

        {this.props.imgs.slice(0, 5).map((img, idx) => (
          <div key={idx} className={`img${idx} gallery-div`}>
            <GalleryImage idx={`img${idx}`} img={img} />
          </div>
        ))}

        
      </div>
    );
  }
}

export default Gallery;
