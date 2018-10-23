import React, { Component } from 'react';
import 'slick-carousel';
import Slider from 'react-slick';
import '../style.css';

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

  render() {
    var setting = {
      slidesToShow: 3,
      slidesToScroll: 1
    };

    return (
      <Slider className="slider container" {...setting}>
        {dummy.map(img => (
          <div className="card">
            <img className="room-image m-auto" src={img}/>
            <div className="card-body">
              <div className="card-title">Card Title</div>
              <p className="card-text">
                Here is some random text about your room
              </p>
            </div> 
          </div>
        ))}
      </Slider>
    );
  }
}

export default RelatedLists;
