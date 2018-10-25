import React, { Component } from 'react';
import styled from 'styled-components';
import $ from 'jquery';

import GalleryImage from './GalleryImage';
import './styles.css';

class Gallery extends Component {

  componentDidMount() {
    $('.gallery img').hover(function(e) {
      const others = ($(e.target).parent().siblings().children().not(e.target))
      $(others).stop();
      $(others).fadeTo(600, 0.6);
    }, function(e) {
      const others = ($(e.target).parent().siblings().children().not(e.target))
      $(others).stop();
      $(others).fadeTo(600, 1)
    })
  }

  render() {
    return (
      <div className="gallery">
        <div className="thumbnail"><GalleryImage cls="thumbnail-image" img={this.props.thumbNail}/></div>
        {this.props.imgs.slice(0,4).map((img, idx) => <div className={`img${idx}`}><GalleryImage img={img} /></div>)}
        
      </div> 
    )
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

