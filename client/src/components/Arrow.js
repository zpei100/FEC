import React, { Component } from 'react';

export default class Arrow extends Component {
  render() {
    const { className, style, onClick } = this.props;
    
    const arrowStyle = {
      display: `block`,
      position: `absolute`,
      top: `50%`,
      height: `20px`,
      width: `20px`,
      transform: `translateY(-50%)`,
    }

    return (
     
        <svg
          viewBox="0 0 18 18"
          role="img"
          aria-label="Next"
          focusable="false"
          style={{height: `24px`, width: `24px`, display: `block`, fill: `rgb(118, 118, 118)`}}
          className="slick-arrow slick-next"
        style={{ ...style }}
        onClick={onClick}
        >
          <path
            d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"
            fillRule="evenodd"
          />
        </svg>
    
    );
  }
}
