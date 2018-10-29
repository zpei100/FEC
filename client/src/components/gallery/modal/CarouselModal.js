import React, { Component } from 'react';
import ReactModal from 'react-modal';
import $ from 'jquery';

import '../../../lib/modal_styles.css';

import ExitBtn from './ExitBtn';
import Carousel from './Carousel';
import Captions from './Captions'

class CarouselModal extends Component {

  constructor() {
    super();

    this.state = {
      active: 0,
      animating: false,
      animationDuration: 200,
      carouselWidth: window.innerWidth > 1036 ? 1036 : window.innerWidth
    }
  }

  handleCarouselTurn (type) {

    var carouselWidth = this.state.carouselWidth;
    var carouselHalfWidth = carouselWidth / 2;
    var captionImageWidth = $('#Captions ol img')[0].width;
    var previousActiveImageOffSet = $('#Captions ol .active')[0].offsetLeft + captionImageWidth / 2;

    var allCaptionImages = $('#Captions ol li');
    var lastCaptionImageOffSet = allCaptionImages[allCaptionImages.length - 1].offsetLeft;

    var totalOffSet = $('#Captions ol')[0].offsetLeft;

    if (!this.state.animating) {
      const change = type === 'next' ? 1 : -1
      this.setState({
        active: this.state.active + change,
        animating: true
      }, () => {
        
        var currentActiveImageOffSet = $('#Captions ol .active')[0].offsetLeft + captionImageWidth / 2;
        var move = 0;

        if (type === 'next') {
          if (currentActiveImageOffSet > carouselHalfWidth) {
            if (previousActiveImageOffSet > carouselHalfWidth) {
              move = currentActiveImageOffSet - previousActiveImageOffSet;
              var lastImageDiff = lastCaptionImageOffSet  + totalOffSet - carouselWidth ;
              if (lastImageDiff < 0) move += lastImageDiff;
            }
            else move = currentActiveImageOffSet - carouselHalfWidth
          } 
        }

        if (type === 'prev') {

          var distanceFromActiveToLast = lastCaptionImageOffSet + captionImageWidth - currentActiveImageOffSet;

          if (distanceFromActiveToLast > carouselHalfWidth) {
            if (distanceFromActiveToLast - carouselHalfWidth > captionImageWidth) {
              move = currentActiveImageOffSet - previousActiveImageOffSet;
             
              if (move < totalOffSet) move = totalOffSet;
            }
            else move = carouselHalfWidth - distanceFromActiveToLast;
          }
        }
      
        

        $('#Captions ol').animate({marginLeft: `-=${move}px` }, 500);
          
        var _this = this;
        setTimeout(function() {_this.setState({animating: false})}, _this.state.animationDuration)
      })
    }
  }

  componentDidMount () {
    $('document').ready(() => {

      var component = this;
      $('.carousel-fade .carousel-inner .carousel-item').css('transition-duration', `${component.state.animationDuration}ms`);  
      $($('.carousel-item')[component.state.active]).toggleClass('active');
      $('.carousel-arrows').on('click', function(e) {
        
        //have not figured out a way to disable the arrow keys yet. If the fade animation of the slides take longer than 200ms, and the user clicks the arrows too quickly in succession, the shown slider and the caption image will not match;

        // $(this).attr('disabled', true)
        // console.log('show this')
        // var _this = this;
        // $(this).attr('disabled', true);
        // console.log('arrows should be disabled: ', this)
        // setTimeout(function() {
        //   $(_this).removeAttr('disabled');
        //   console.log('button is being enabled');
        // }, component.state.animationDuration)
      })
    })
  }

  render() {

    var carouselWidth = this.state.carouselWidth >= 1036 ? 1036 : this.state.carouselWidth;
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