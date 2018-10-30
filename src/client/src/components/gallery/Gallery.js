import React, { Component } from 'react';
import $ from 'jquery';

import GalleryImage from './GalleryImage';
import CarouselModal from './modal/CarouselModal';
import TopButton from './TopButton';
import ViewPhotos from './ViewPhotos';

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      activeImg: 0
    };
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
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
          transform: 'translateY(-15px)',
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

  handleImageClick (idx) {
    this.setState({
      activeImg: idx,
      showModal: true
    })
  }

  render() {
    return (
      <div className="gallery">
        <CarouselModal
          handleCloseModal={this.handleCloseModal.bind(this)}
          showModal={this.state.showModal}
          imgs={this.props.imgs}
          activeImg={this.state.activeImg}
        />

        <div className="button-group-top button mx-4 my-4 d-flex">
          <TopButton type="share" />
          <TopButton type="save" />
        </div>

        <div className="button-bottom button mx-4 my-4">
          <ViewPhotos handleOpenModal={this.handleOpenModal.bind(this)} />
        </div>

        {this.props.imgs.slice(0, 5).map((img, idx) => (
          <div key={idx} className={`img${idx} gallery-div border border-dark`}>
            <GalleryImage idx={`img${idx}`} img={img} handleImageClick={() => this.handleImageClick.bind(this)(idx)}/>
          </div>
        ))}
      </div>
    );
  }
}

export default Gallery;
