import React from 'react';
import { connect } from "react-redux";

const Captions = function ({ room: { imgs }, carouselWidth, activeImage }) {

  return (
    <div id="Captions" className="container-fluid">
      <div style={{width: `${carouselWidth}px`, overflow: 'hidden', position: 'relative' }} className="container h-100 p-0">
        <ol className="carousel-indicators justify-content-start h-100">
          {imgs.map((img, idx) => (
            <li
              data-target="#modal-carousel"
              data-slide-to="0"
              className={`${activeImage === idx ? 'active' : ''} h-100 w-auto mx-2`}
              style={{ position: 'relative' }}
              key={idx}
            >
              <img className="d-block h-100 w-auto" src={img} alt="" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    room: state.room,
    activeImage: state.activeImage
  }
}

export default connect(mapStateToProps)(Captions);