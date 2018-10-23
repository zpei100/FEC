import React, { Component } from 'react';
import Rating from './rating';
import $ from 'jquery';

import '../lib/style.css';

var dummy = [
  `https://picsum.photos/200/300/?image=499`,
  `https://picsum.photos/200/300/?image=599`,
  `https://picsum.photos/200/300/?image=699`,
  `https://picsum.photos/200/300/?image=799`,
  `https://picsum.photos/200/300/?image=899`,
  `https://picsum.photos/200/300/?image=999`,
  `https://picsum.photos/200/300/?image=199`,
  `https://picsum.photos/200/300/?image=299`,
  `https://picsum.photos/200/300/?image=399`
];

class RelatedLists extends Component {
  constructor(props) {
    super(props);
  }

  moveLeft() {
    var $slides = $('.slides');
    console.log($slides);
    $slides.animate({ 'margin-left': '-=349.32px' }, 1000);
  }

  moveRight() {
    var $slides = $('.slides');
    console.log($slides);
    $slides.animate({ 'margin-left': '+=349.32px' }, 1000);
  }

  render() {
    var length = dummy.length * 349.32;

    var slideStyle = {
      width: `${length}px`,
      height: '339px',
      display: 'block'
    };

    return (
      <div>
        <button
          onClick={this.moveLeft}
          className="btn btn-primary float-left"
          id="prev"
        >
          Prev
        </button>
        <button
          onClick={this.moveRight}
          className="btn btn-primary float-right"
          id="prev"
        >
          Next
        </button>
        <div className="slider">
          <div style={slideStyle} className="slides">
            {dummy.map(img => (
              <div className="card border-0 slide">
                <img className="room-image m-auto" src={img} />
                <div className="card-body">
                  <div className="card-title room-type">ENTIRE APARTMENT</div>
                  <div className="card-text room-description">
                    Luxury waterfont & amazing views
                  </div>
                  <div className="card-text room-review">$300 per night</div>
                  <div>
                    <Rating rating={3.37} roomId={5} />
                    <span>330</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default RelatedLists;
