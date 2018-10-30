import React, { Component } from 'react';
import ReactModal from 'react-modal';
import $ from 'jquery';
import { connect } from 'react-redux';

import ExitBtn from './ExitBtn';
import Carousel from './Carousel';
import Captions from './Captions';

import changeActiveImage from '../../../actionCreators/changeActiveImage';
import { bindActionCreators } from 'redux';

class CarouselModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animating: false,
      animationDuration: 200,
      carouselWidth: window.innerWidth > 1036 ? 1036 : window.innerWidth
    };
  }

  //this function defines the logic of the modal-carousel. do not adjust this block of code or the slider will break.

  //see a commet below for the end of the carousel logic.
  handleCarouselTurn(type) {
    var carouselWidth = this.state.carouselWidth;
    var carouselHalfWidth = carouselWidth / 2;
    var captionImageWidth = $('#Captions ol img')[0].width;
    var previousActiveImageOffSet =
      $('#Captions ol .active')[0].offsetLeft + captionImageWidth / 2;

    var allCaptionImages = $('#Captions ol li');
    var lastCaptionImageOffSet =
      allCaptionImages[allCaptionImages.length - 1].offsetLeft;

    var totalOffSet = $('#Captions ol')[0].offsetLeft;

    if (!this.state.animating) {
      var newActive;
      if (
        this.props.activeImage === allCaptionImages.length - 1 &&
        type === 'next'
      )
        newActive = 0;
      else if (this.props.activeImage === 0 && type === 'prev')
        newActive = allCaptionImages.length - 1;
      else newActive = this.props.activeImage + (type === 'next' ? 1 : -1);

      //use action creator
      this.props.changeActiveImage(newActive);

      this.setState(
        {
          animating: true
        },
        () => {
          var currentActiveImageOffSet =
            $('#Captions ol .active')[0].offsetLeft + captionImageWidth / 2;
          var move = 0;

          if (type === 'next') {
            if (this.props.activeImage === 0) move = totalOffSet;
            else if (currentActiveImageOffSet > carouselHalfWidth) {
              if (previousActiveImageOffSet > carouselHalfWidth) {
                move = currentActiveImageOffSet - previousActiveImageOffSet;
                var lastImageDiff =
                  lastCaptionImageOffSet + totalOffSet - carouselWidth;
                if (lastImageDiff < 0) move += lastImageDiff;
              } else move = currentActiveImageOffSet - carouselHalfWidth;
            }
          }

          if (type === 'prev') {
            if (this.props.activeImage === allCaptionImages.length - 1)
              move = lastCaptionImageOffSet - carouselWidth + captionImageWidth;
            else {
              var distanceFromActiveToLast =
                lastCaptionImageOffSet +
                captionImageWidth -
                currentActiveImageOffSet;
              if (distanceFromActiveToLast > carouselHalfWidth) {
                if (
                  distanceFromActiveToLast - carouselHalfWidth >
                  captionImageWidth
                ) {
                  move = currentActiveImageOffSet - previousActiveImageOffSet;

                  if (move < totalOffSet) move = totalOffSet;
                } else move = carouselHalfWidth - distanceFromActiveToLast;
              }
            }
          }

          $('#Captions ol').animate({ marginLeft: `-=${move}px` }, 500);

          var _this = this;
          setTimeout(function() {
            _this.setState({ animating: false });
          }, _this.state.animationDuration);
        }
      );
    }
  }

  toggleActiveCaption() {
    $($('.carousel-item')[this.props.activeImage]).toggleClass('active');
  }

  handleModalShown() {
    $('document').ready(() => {
      this.toggleActiveCaption();

      var carouselWidth = this.state.carouselWidth;
      var carouselHalfWidth = carouselWidth / 2;
      var captionImageWidth = $('#Captions ol img')[0].width;

      var allCaptionImages = $('#Captions ol li');
      var lastCaptionImageOffSet =
        allCaptionImages[allCaptionImages.length - 1].offsetLeft;

      var currentActiveImageOffSet =
        $('#Captions ol .active')[0].offsetLeft + captionImageWidth / 2;

      var move = 0;
      if (currentActiveImageOffSet > carouselHalfWidth) {
        move = currentActiveImageOffSet - carouselHalfWidth;
        var diff = lastCaptionImageOffSet + captionImageWidth - move;
        if (diff < carouselWidth) {
          move -= carouselWidth - diff;
        }
      }

      $('#Captions ol').animate({ marginLeft: `-=${move}px` }, 500);
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.showModal !== prevProps.showModal &&
      this.props.showModal === true
    ) {
      if (this.props.activeImg !== prevProps.activeImg) {
        // use action creator
      } else this.handleModalShown();
    }
  }
  //end of carousel logic.

  componentDidMount() {
    $('document').ready(() => {
      $('.carousel-fade .carousel-inner .carousel-item').css(
        'transition-duration',
        `${this.state.animationDuration}ms`
      );
      this.toggleActiveCaption();
      // $('.carousel-arrows').on('click', function(e) {

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
      // })
    });
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
        />
        <Captions
          carouselWidth={carouselWidth}
          id="Captions"
          imgs={imgs}
          active={this.state.active}
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

//<Captions carouselWidth={carouselWidth} id="Captions" imgs={imgs}/>
