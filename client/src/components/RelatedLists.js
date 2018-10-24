import React, { Component } from 'react';
import Slider from 'react-slick';

import RoomCard from './RoomCard';
import NextArrow from './Arrow';

var dummy = [
  `https://picsum.photos/333/222/?image=499`,
  `https://picsum.photos/333/222/?image=599`,
  `https://picsum.photos/333/222/?image=699`,
  `https://picsum.photos/333/222/?image=439`,
  `https://picsum.photos/333/222/?image=199`
];

class RelatedLists extends Component {
  render() {
    const settings = {
      infinite: false,
      slidesToScroll: 1,
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
            slidesToShow: 1,
          }
        }
      ],
      nextArrow: <NextArrow />
    };

    return (
      <div className="container">
        <div className="row justify-content-center">
        <button></button>
        <Slider className="col-sm-11 p-0" {...settings}>
          {dummy.map((img, idx) => <RoomCard img={img} roomId={idx} rating={3.37} key={idx} />)}
        </Slider>
        </div>
      </div>
    );
  }
}

export default RelatedLists;
