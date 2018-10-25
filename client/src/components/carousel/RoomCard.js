import React, { Component } from 'react';

import Rating from './Rating';

export default class RoomCard extends Component {
  render() {
    const {
      type,
      tag,
      description,
      id,
      beds,
      price,
      rating,
      reviews,
      imgs
    } = this.props;

    return (
      <div className="p-2">
        <div style={{ position: 'relative' }}>
          <svg
            viewBox="20 0 25 25"
            fill="#484848"
            fillOpacity="0.5"
            stroke="#ffffff"
            strokeWidth="2.5"
            focusable="false"
            aria-label="Add listing to a list"
            role="img"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              height: `28px`,
              width: `28px`,
              display: `block`,
              overflow: `visible`,
              position: 'absolute',
              right: 0
            }}
            className="m-2"
          >
            <path d="m23.99 2.75c-.3 0-.6.02-.9.05-1.14.13-2.29.51-3.41 1.14-1.23.68-2.41 1.62-3.69 2.94-1.28-1.32-2.46-2.25-3.69-2.94-1.12-.62-2.27-1-3.41-1.14a7.96 7.96 0 0 0 -.9-.05c-1.88 0-7.26 1.54-7.26 8.38 0 7.86 12.24 16.33 14.69 17.95a1 1 0 0 0 1.11 0c2.45-1.62 14.69-10.09 14.69-17.95 0-6.84-5.37-8.38-7.26-8.38" />
          </svg>

          <img style={{cursor: "pointer"}} className="m-auto w-100 h-auto" src={imgs[0]} alt=""/>
        </div>

        <div style={{cursor: "pointer"}} className="mt-2 p-0" >
          <div className="mb-0 room-type d-flex" style={{ height: '20px' }}>
            {tag === 'PLUS' ? (
              <span
                className="mr-1 small px-1 border rounded"
                style={{ backgroundColor: 'rgb(166, 30, 85)' }}
              >
                <span className="text-light" style={{ fontWeight: 800 }}>
                  PLUS
                </span>
              </span>
            ) : (
              ''
            )}

            <div className=" " style={{ fontSize: '10px', lineHeight: '20px' }}>
              <span
                style={
                  tag === 'PLUS'
                    ? { color: 'rgb(166, 29, 85)', fontWeight: 800 }
                    : { fontWeight: 800 }
                }
              >
                {tag === 'PLUS' ? 'VERIFIED' : type} &#183; {beds} BEDS
              </span>
            </div>
          </div>
          <div className="h6 m-0">
            <strong style={{ fontSize: '14px' }}>{description}</strong>
          </div>
          <div className="small">${price} per night</div>
          <div className="small">
            <Rating
              rating={rating}
              roomId={id}
              color={tag === 'PLUS' ? 'purple' : 'yellow'}
            />
            <span>{reviews}</span>
          </div>
        </div>
      </div>
    );
  }
}
