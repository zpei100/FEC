import React, { Component } from 'react';

import Rating from './Rating';

export default class RoomCard extends Component {
  render() {
    
    const {type, tag, favorite, description, id, beds, price, rating, reviews, img} = this.props

    return (
      <div className="p-2">
        <img className="m-auto w-100 h-auto" src={img} />
        <div className="mt-2 p-0">
          <div className="card-title mb-0 room-type d-flex ">
            <span className="align-self-center small">{type} {beds}BEDS</span>
          </div>
          <div className="h6 m-0">
            <strong>{description}</strong>
          </div>
          <div className="small">${price} per night</div>
          <div>
            <Rating rating={rating} roomId={id} />
            <span className="small">{reviews}</span>
          </div>
        </div>
      </div>
    );
  }
}
