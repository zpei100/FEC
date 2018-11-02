import React from 'react';
import { connect } from 'react-redux';
import { thumbsUp } from '../../lib/svg';
import $ from 'jquery';

const toggleHighlight = function(e) {
  $($(e.target)[0]).toggleClass('active');
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
    owner,
    detail
  }
}) {
  return (
    <div className="container mt-3 description">
      <div className="col-7 justify-self-end" >
        <div className="small">{type}</div>
        <div className="row d-flex justify-content-between">
          <div className="mt-2 col-8">
            <div
              className="font-weight-bold"
              style={{ fontSize: '1.8rem', fontWeight: '700' }}
              id="description-start"
            >
              {title}
            </div>
            <div className="ml-0">{location}</div>
          </div>
          <div className="col-2 d-flex flex-column align-self-center">
            <div className="row">
              <img
                className="m-auto h-75 w-auto"
                src="https://image.ibb.co/cz7USf/David.png"
              />
            </div>
            <span className="row my-0 mx-auto">{owner}</span>
          </div>
        </div>

        <ul
          className="d-flex justify-content-start mt-3 pl-0"
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

        <div className="card border border-light" style={{boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.05)'}}>
          <div className="card-body">
            <h5 className="card-title text-secondary small font-weight-bold mb-2 pb-0">
              HOME HIGHLIGHTS
            </h5>
            <ul style={{ listStyleType: 'none' }} className="pl-0 list-group">
              {highlights.map(highlight => (
                <li className="card-text list-group-item border-0 p-0">
                  <div className="mb-2">{highlight}</div>
                  <div className="highlight d-inline-flex">
                    <span
                      className="mr-1"
                      style={{cursor: 'pointer'}}
                      onMouseEnter={toggleHighlight}
                      onMouseLeave={toggleHighlight}
                    >
                      Helpful
                    </span>
                    <span
                      className="mr-1"
                      style={{cursor: 'pointer'}}
                      onMouseEnter={toggleHighlight}
                      onMouseLeave={toggleHighlight}
                      >{thumbsUp}
                    </span>
                    &#183;
                    <span
                      className="mr-1"
                      style={{cursor: 'pointer'}}
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

        <div style={{cursor: 'pointer', color: 'teal'}} className="my-4"><a data-toggle="collapse" data-target="#read-more" aria-expanded="false" >Read more about the space</a></div>
        <div id="read-more" className="collapse">
        <p>
          {detail}
        </p>
        <div style={{cursor: 'pointer', color: 'teal'}} className="my-4"><a data-toggle="collapse" data-target="#read-more" href="#description-start" aria-expanded="false" >Read more Hide ^ </a></div>
       
        </div>
        <div style={{cursor: 'pointer', color: 'teal'}} className="my-4" >Contact host</div>
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
