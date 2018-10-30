import React from 'react';
import { connect } from 'react-redux';

import Arrow from './Arrow';

const Carousel = function({ room: { imgs }, carouselWidth, handleCarouselTurn }) {
  //need to make arrows shrink at width: 735 px;
  return (
    <div
      className="carousel slide carousel-fade carousel-thumbnails row m-0"
      id="modal-carousel"
      data-interval="false"
    >
      <div
        className="carousel-inner container-fluid flex-nowrap p-0"
        id="Carousel-inner"
        style={{ width: `${carouselWidth}px` }}
        role="listbox"
      >
        {imgs.map((img, idx) => (
          <div
            className="carousel-item h-100"
            style={{ maxHeight: '700px ' }}
            key={idx}
          >
            <div className="carousel-caption caption-text" >
              CAPTIONS TEXT AND STUFF
            </div>
            <img className="d-block h-100 w-auto" src={img} alt="" />
          </div>
        ))}
      </div>

      <Arrow type="prev" handleCarouselTurn={handleCarouselTurn} />
      <Arrow type="next" handleCarouselTurn={handleCarouselTurn} />
    </div>
  );
};

const mapStateToProps = function(state) {
  return {
    room: state.room
  };
};

export default connect(mapStateToProps)(Carousel);
