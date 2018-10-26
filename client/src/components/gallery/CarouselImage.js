import React, { Component } from 'react';
import './styles.css';

class CarouselImage extends Component {
  render() {
    const { img } = this.props;
    return (
        <img className="m-auto " src={img} style={style} />
    )
  }
}

export default CarouselImage;

const style = {
  height: 'auto',
  width: 'auto',
}