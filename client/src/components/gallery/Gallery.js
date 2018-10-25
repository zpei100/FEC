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
        $(others).fadeTo(400, 0.6);
      },
      function(e) {
        const others = $(e.target)
          .parent()
          .siblings()
          .children('img')
          .not(e.target);
        $(others).stop();
        $(others).fadeTo(400, 1);
      }
    );
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
