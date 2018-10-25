import React, { Component } from 'react';
import $ from 'jquery';

import GalleryImage from './GalleryImage';
import { save, share } from '../../lib/svg';
import './styles.css';

class Gallery extends Component {
  componentDidMount() {
   $('.gallery img').hover(
      function(e) {
        const others = $(e.target)
          .parent()
          .siblings()
          .children('img')
          .not(e.target);
        $(others).stop();
        $(others).css({opacity: 0.7, transition: "ease-in, 1s"})
        // $(others).fadeTo(600, 0.7, 'swing') alternative
      },
      function(e) {
        const others = $(e.target)
          .parent()
          .siblings()
          .children('img')
          .not(e.target);
        $(others).stop();
        $(others).css({opacity: 1, transition: "ease-in, 1s"})
        // $(others).fadeTo(400, 1, 'swing');
      }
    );
  
    this.floatButtonWhenEntering($('.img3'))
    this.floatButtonWhenEntering($('.button-bottom'))
  }

  floatButtonWhenEntering(ele) {
    ele.hover(function(e) {
      $('.button-bottom').css({transform: "translateY(-12px)",
        transition: "opacity 0.2s ease-in, transform 0.35s"})
    }, function(e) {
      $('.button-bottom ').css({transform: "translateY(0)",
      transition: "opacity 0.2s ease-in, transform 0.35s"})
  }, function(e) {
    })
  }

  render() {
    return (
      <div className="gallery">
        <div className="button-top button mx-4 my-4 d-flex">
          
            <button className="btn btn-lg mx-3 py-1 button-text d-flex btn-light">
              <div className="mr-2 align-self-center">{share}</div>
              <div style={{lineHeight: '25px'}}>Share</div>
            </button>
        
            <button className="btn btn-lg py-1 button-text d-flex btn-light">
              <div className="mr-2 align-self-center">{save}</div>
              <div style={{lineHeight: '25px'}}>Save</div>
            </button>
        </div>

        <div className="button-bottom button mx-4 my-4">
          <button className="btn btn-lg py-1 button-text btn-light">View Photos</button>
        </div>


        <div className="thumbnail gallery-div">
          <GalleryImage cls="thumbnail-image" img={this.props.thumbNail} />
        </div>

        {this.props.imgs.slice(0, 4).map((img, idx) => (
          <div className={`img${idx} gallery-div`}>
            <GalleryImage img={img} />
          </div>
        ))}
      </div>
    );
  }
}

export default Gallery;

/*
1. grid system, insert 5 pictures
2. hover: point
3. zoom effect on pictures
4. three buttons 
5. fifth picture triggers animation of button floating
6. react router to show carousel
*/
