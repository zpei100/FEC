import React, { Component } from 'react';
import { connect } from 'react-redux';

import GalleryImage from './GalleryImage';
import CarouselModal from './modal/CarouselModal';
import TopButton from './TopButton';
import ViewPhotos from './ViewPhotos';

const Gallery = function({ room: {imgs}, room, user, updateFavorites}) {

  return (
    <div className="gallery">
      <CarouselModal />

      <div className="button-group-top button mx-4 my-4 d-flex">
        <TopButton type="share" user={user} updateFavorites={updateFavorites} room={room}/>
        <TopButton type="save" user={user} updateFavorites={updateFavorites} room={room}/>
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
    room: state.room,
    user: state.user
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);

const mapDispatchToProps = function(dispatch) {
  return {
    updateFavorites: bindActionCreators(updateFavorites, dispatch),
  }
}

