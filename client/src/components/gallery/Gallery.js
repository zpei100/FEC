import React, { Component } from 'react';
import { ImageCover } from './styles';
import './styles.css';

class Gallery extends Component {
  render() {
    return (
      <div className="gallery">
        <div className="thumbnail"><img  src={this.props.thumbNail}/></div>
        <div className="img1"><img  src={this.props.imgs[0]}/></div>
        <div className="img2"><img  src={this.props.imgs[1]}/></div>
        <div className="img3"><img  src={this.props.imgs[2]}/></div>
        <div className="img4"><img  src={this.props.imgs[3]}/></div>
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

