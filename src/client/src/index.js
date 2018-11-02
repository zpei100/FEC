
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { floatButtonWhenEntering, highlightImageOnHover } from './helpers/initialize';

const pathname = window.location.pathname;
const roomId = parseInt(pathname.slice(7));

if (pathname.startsWith('/rooms/') && typeof id === 'number') {
    

  //where the server, that serves this application lives;
  const host = 'https://vast-fortress-96596.herokuapp.com/';

  axios.get(`${host}csr/${roomId}`).then(({ data: room, user, relatedListings }) => {
    const store = createStore(rootReducer, {room, relatedListings, user}, applyMiddleware(thunk));

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

    $(document).ready(function() {
      const $galleryImages = $('.gallery img');
      const $fourthImage = $('.img4');
      const $viewPhoto = $('.button-bottom');

      highlightImageOnHover($galleryImages);
      floatButtonWhenEntering($fourthImage);
      floatButtonWhenEntering($viewPhoto);
    });
  })
}

