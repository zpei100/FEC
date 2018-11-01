import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';
import Gallery from "../src/components/gallery/Gallery";
import RelatedListings from "../src/components/carousel/RelatedListings";

import {
  floatButtonWhenEntering,
  highlightImageOnHover
} from './helpers/initialize';

// CHANGE THIS NUMBER TO BE DYNAMIC, DEPENDING ON THE URL YOU ARE USING TO MAKE THE GET REQUEST
const roomId = 25


axios.get(`http://localhost:3001/csr/${roomId}`).then(({ data: room }) => {
  axios.get('http://localhost:3001/csr/getUser').then(({ data: user }) => {
    const {favorites, id, username} = user;
    const store = createStore(rootReducer, {room, user: {favorites, id, username}}, applyMiddleware(thunk));

    ReactDOM.render(
      <Provider store={store}>
        <Gallery />
      </Provider>,
      document.getElementById('gallery-app')
    );

    ReactDOM.render(
      <Provider store={store}>
        <RelatedListings />
      </Provider>,
      document.getElementById('related-listings-app')
    );

    var rooms = [];
    room.related.forEach((id, idx, related) => {
      axios.get(`http://localhost:3001/csr/${id}`).then(({ data: room }) => {
        rooms.push(room);
        if (rooms.length === related.length)
          store.dispatch({
            type: 'UPDATE_RELATED_LISTINGS',
            payload: rooms
          });
      });
    });

    $(document).ready(function() {
      const $galleryImages = $('.gallery img');
      const $fourthImage = $('.img4');
      const $viewPhoto = $('.button-bottom');

      highlightImageOnHover($galleryImages);
      floatButtonWhenEntering($fourthImage);
      floatButtonWhenEntering($viewPhoto);
    });
  });
});
