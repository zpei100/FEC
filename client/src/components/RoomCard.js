import React, { Component } from 'react';


import Rating from './Rating';

export default class RoomCard extends Component {
  render() {
    var imgStyle = {
      maxWidth: `100%`,
      height: `auto`
    }

    return (
      <div className="p-1">
        <img className="m-auto w-100 h-auto" style={imgStyle} src={this.props.img} />
        <div className="mt-2 p-0">
          <div className="card-title mb-0 room-type d-flex ">
            <span className="align-self-center small">ENTIRE APARTMENT</span>
          </div>
          <div className="h6 m-0">
            <strong>Luxury waterfont & amazing views</strong>
          </div>
          <div className="small">$300 per night</div>
          <div>
            <Rating rating={this.props.rating} roomId={this.props.roomId} />
            <span className="small">330</span>
          </div>
        </div>
      </div>
    );
  }
}
