import React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';

import RoomCard from './RoomCard';
import Arrow from './Arrow';

const RelatedListings = function({ relatedListings }) {
  const settings = {
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1410,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ],
    nextArrow: <Arrow direction="+" />,
    prevArrow: <Arrow direction="-" />
  };

  return relatedListings.length > 0 ? (
    <div className="container">
      <Slider {...settings}>
        {relatedListings.map(room => (
          <RoomCard key={room.id} {...room} />
        ))}
      </Slider>
    </div>
  ) : (
    ''
  );
};

const mapStateToProps = function(state) {
  return {
    relatedListings: state.relatedListings
  };
};

export default connect(mapStateToProps)(RelatedListings);
