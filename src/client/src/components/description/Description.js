import React from 'react';
import { connect } from 'react-redux';
import { thumbsUp } from '../../lib/svg';
import $ from 'jquery';

const toggleHighlight = function(e) {
  $(e.target).toggleClass('active');
};

const Description = function({
  description: {
    type,
    title,
    location,
    guests,
    bedrooms,
    beds,
    baths,
    highlights,
    description,
    owner
  }
}) {
  return (
    <div
      className="container-fluid col-7 mt-3 description"
    >
      <div className="col-7 justify-self-end">
        <div className="small">{type}</div>
        <div className="row d-flex justify-content-between">
          <div className="mt-2 col-8">
            <div
              className="font-weight-bold"
              style={{ fontSize: '1.8rem', fontWeight: '700' }}
            >
              {title}
            </div>
            <div className="ml-0">{location}</div>
          </div>
          <div className="col-2 d-flex flex-column">
            <div className="row align-self-center">
              <img
                className="m-auto h-75 w-auto"
                src="https://image.ibb.co/cz7USf/David.png"
              />
            </div>
            <span className="row m-auto">{owner}</span>
          </div>
        </div>

        <ul
          className="d-flex justify-content-start mt-2 pl-0"
          style={{ listStyleType: 'none' }}
        >
          <li className="mr-5">
            <img src="https://image.ibb.co/hjsPcf/guests.png" />
            {guests}
          </li>
          <li className="mr-5">
            <img src="https://image.ibb.co/nDMviL/bedrooms.png" />
            {bedrooms}
          </li>
          <li className="mr-5">
            <img src="https://image.ibb.co/emdxxf/beds.png" />
            {beds}
          </li>
          <li className="mr-5">
            <img src="https://image.ibb.co/daQzA0/baths.png" />
            {baths}
          </li>
        </ul>

        <div className="card border border-secondary">
          <div className="card-body">
            <h5 className="card-title text-secondary small font-weight-bold">
              HOME HIGHLIGHTS
            </h5>
            <ul style={{ listStyleType: 'none' }} className="pl-0 list-group">
              {highlights.map(highlight => (
                <li className="card-text list-group-item border-0 pl-0">
                  <div>{highlight}</div>
                  <div className="highlight d-inline-flex">
              
                    <span
                      onMouseEnter={toggleHighlight}
                      onMouseLeave={toggleHighlight}
                    >
                      Helpful
                    </span>
                    <span
                      onMouseEnter={toggleHighlight}
                      onMouseLeave={toggleHighlight}
                      >{thumbsUp}
                    </span>
                    &#183;
                    <span
                      onMouseEnter={toggleHighlight}
                      onMouseLeave={toggleHighlight}
                    >
                      Not helpful
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card-text mt-3">{description}</div>
      </div>
    </div>
  );
};

const mapStateToProps = function(state) {
  return {
    description: state.description
  };
};

export default connect(mapStateToProps)(Description);
