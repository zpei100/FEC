import React, { Component } from 'react';

class GalleryImage extends Component {

  render() {
    return <img className="border border-dark" className={this.props.idx} src={this.props.img} alt=""/>
  }
}
export default GalleryImage;
