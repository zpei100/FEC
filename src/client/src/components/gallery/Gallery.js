import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';

import GalleryImage from './GalleryImage';
import CarouselModal from './modal/CarouselModal';
import TopButton from './TopButton';
import ViewPhotos from './ViewPhotos';

const Gallery = function({ room: {imgs} }) {

  return (
    <div className="gallery">
      <CarouselModal />

      <div className="button-group-top button mx-4 my-4 d-flex">
        <TopButton type="share" />
        <TopButton type="save" />
      </div>

      <div className="button-bottom button mx-4 my-4">
        <ViewPhotos />
      </div>

      {imgs ? imgs.slice(0, 5).map((img, idx) => (
        <div key={idx} className={`img${idx} gallery-div border border-dark`}>
          <GalleryImage idx={idx} img={img} />
        </div>
      ))
      :
      ""
      }
    </div>
  );
};

const mapStateToProps = function(state) {
  return {
    room: state.room
  };
};

export default connect(mapStateToProps)(Gallery);
