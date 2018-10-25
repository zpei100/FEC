import React, { Component } from 'react';
import Slider from 'react-slick';
import axios from 'axios';

import RoomCard from './RoomCard';
import Arrow from './Arrow';

class RelatedLists extends Component {
  constructor() {
    super();
    this.state = {
      rooms: [],
    }
  }

  //need to fix
  componentDidMount() {
    var rooms = [];
    var count = 0;
    this.props.related.forEach(id => {
      axios.get(`http://localhost:4000/room/${id}`).then(({data}) => {
        count ++;
        rooms.push(data[0]);
        if (count === this.props.related.length) {
          this.setState({rooms})
        }
      })
    })
  }

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
      nextArrow: <Arrow direction="+" />,
      prevArrow: <Arrow direction="-" />,
    };
    return (
      this.state.rooms.length > 0 ? 
      <div className="container">
        <div className="row justify-content-center col-12 p-0 m-0">
          <Slider className="col-sm-11 p-0 m-auto" {...settings}>
            {this.state.rooms.map(room => <RoomCard key={room.id} {...room} />)}
          </Slider>
        </div>
      </div>
      : <div> Temporary Loading Screen , will be gone in production </div>
    );
  }
}

export default RelatedLists;
