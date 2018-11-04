import React, { Component } from 'react';
import ReactModal from 'react-modal';
import $ from 'jquery';
import { connect } from 'react-redux';

import ExitBtn from './ExitBtn';
import Carousel from './Carousel';
import Captions from './Captions';

import changeActiveImage from '../../actionCreators/changeActiveImage';
import { bindActionCreators } from 'redux';

class CarouselModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAnimating: false,
      animationDuration: 400,
      carouselWidth: 1036
    };
  }

  //when clicking on image, nothing happens;

  componentDidUpdate(prevProps) {
    $(document).ready(() => {
      $('.carousel-fade .carousel-inner .carousel-item').css('transition-duration',`${this.state.animationDuration}ms`);
      if (this.props.showModal && !prevProps.showModal) {
        this.toggleActiveCaption();
      };
    })
  }

  toggleActiveCaption() {
    $($('.carousel-item')[this.props.activeImage]).toggleClass('active');

    var carouselWidth = this.state.carouselWidth;
    var carouselHalfWidth = carouselWidth / 2;
    var captionImageWidth = $('#Captions ol img')[0].width;

    var allCaptionImages = $('#Captions ol li');
    var lastCaptionImageOffSet = allCaptionImages[allCaptionImages.length - 1].offsetLeft;
    var totalOffSet = $('#Captions ol')[0].offsetLeft;

    var currentActiveImageOffSet = $('#Captions ol .active')[0].offsetLeft + totalOffSet + captionImageWidth / 2;

    console.log('current off set: ', currentActiveImageOffSet)
    console.log('half width', carouselHalfWidth)

    var move = 0;
    if (currentActiveImageOffSet > carouselHalfWidth) {
      move = currentActiveImageOffSet - carouselHalfWidth;
      var diff = lastCaptionImageOffSet + captionImageWidth - move;
      if (diff < carouselWidth) {
        move -= carouselWidth - diff;
      }
    }
    
    $('#Captions ol').animate({ marginLeft: `-=${move}px` }, this.state.animationDuration);
  }

  handleCarouselTurn(type) {
    const { activeImage, changeActiveImage } = this.props; 
    const { carouselWidth, isAnimating, animationDuration } = this.state;

    var carouselHalfWidth = carouselWidth / 2;
    var captionImageWidth = $('#Captions ol img')[0].width;
    var previousActiveImageOffSet = $('#Captions ol .active')[0].offsetLeft + captionImageWidth / 2;
    var allCaptionImages = $('#Captions ol li');
    var lastCaptionImageOffSet = allCaptionImages[allCaptionImages.length - 1].offsetLeft;
    var totalOffSet = $('#Captions ol')[0].offsetLeft;

    if (!isAnimating) {
      if (activeImage === allCaptionImages.length - 1 && type === 'next') changeActiveImage(0);
      else if (activeImage === 0 && type === 'prev') changeActiveImage(allCaptionImages.length - 1)
      else changeActiveImage(activeImage + (type === 'next' ? 1 : -1));
     
      this.setState({isAnimating: true}, () => {
        var currentActiveImageOffSet = $('#Captions ol .active')[0].offsetLeft + captionImageWidth / 2;
        var move = 0;
        if (type === 'next') {
          if (activeImage === allCaptionImages.length - 1) move = totalOffSet;
          else if (currentActiveImageOffSet > carouselHalfWidth) {
            if (previousActiveImageOffSet > carouselHalfWidth) {
              move = currentActiveImageOffSet - previousActiveImageOffSet;
              var lastImageDiff = lastCaptionImageOffSet + totalOffSet - carouselWidth;
              if (lastImageDiff < 0) move += lastImageDiff;
            } else move = currentActiveImageOffSet - carouselHalfWidth;
          }
        }

        if (type === 'prev') {
          if (activeImage === 0) move = lastCaptionImageOffSet - carouselWidth + captionImageWidth;
          else {
            var distanceFromActiveToLast =
              lastCaptionImageOffSet +
              captionImageWidth -
              currentActiveImageOffSet;
            if (distanceFromActiveToLast > carouselHalfWidth) {
              if (distanceFromActiveToLast - carouselHalfWidth > captionImageWidth) {
                move = currentActiveImageOffSet - previousActiveImageOffSet;
                if (move < totalOffSet) move = totalOffSet;
              } else move = carouselHalfWidth - distanceFromActiveToLast;
            }
          }
        }

        $('#Captions ol').animate({ marginLeft: `-=${move}px` }, animationDuration);

        var _this = this;
        setTimeout(function() {
          _this.setState({ isAnimating: false });
        }, _this.state.animationDuration + 200);
      });
    }
  }
  
  render() {
    var carouselWidth =
      this.state.carouselWidth >= 1036 ? 1036 : this.state.carouselWidth;
    const { handleCloseModal, imgs } = this.props;

    return (
      <ReactModal
        isOpen={this.props.showModal}
        className="Modal"
        ariaHideApp={false}
      >
        <ExitBtn />
        <Carousel
          carouselWidth={carouselWidth}
          handleCarouselTurn={this.handleCarouselTurn.bind(this)}
          isAnimating={this.state.isAnimating}
        />
        <Captions
          carouselWidth={carouselWidth}
          id="Captions"
          imgs={imgs}
          active={this.props.activeImage}
          toggleActiveCaption={this.toggleActiveCaption.bind(this)}
        />
      </ReactModal>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    showModal: state.showModal,
    activeImage: state.activeImage
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    changeActiveImage: bindActionCreators(changeActiveImage, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarouselModal);