import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import changeActiveImage from '../../actionCreators/changeActiveImage';

const Captions = function ({ room: { imgs }, carouselWidth, activeImage, changeActiveImage }) {

  return (
    <div id="Captions" className="container-fluid">
      <div style={{width: `${carouselWidth}px`, overflow: 'hidden', position: 'relative' }} className="container h-100 p-0">
        <ol className="carousel-indicators justify-content-start h-100">
          {imgs.map((img, idx) => (
            <li
              data-target="#modal-carousel"
              data-slide-to={idx}
              className={`${activeImage === idx ? 'active' : ''} h-100 w-auto mx-2`}
              style={{ position: 'relative' }}
              key={idx}
              onClick={() => {
                changeActiveImage(idx);
              }}
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

const mapDispatchToProps = function(dispatch) {
  return {
    changeActiveImage: bindActionCreators(changeActiveImage, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Captions);