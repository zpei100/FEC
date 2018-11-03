
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { floatButtonWhenEntering, highlightImageOnHover } from './helpers/initialize';

import RelatedListings from "../src/components/carousel/RelatedListings";
import Description from "../src/components/description/Description";
import Gallery from "../src/components/gallery/Gallery";
import Nav from "../src/components/navbar/Nav";

import rootReducer from './reducers/rootReducer';

const pathname = window.location.pathname;
const roomId = parseInt(pathname.slice(7));

console.log('index is read') 

console.log('path name: ' , pathname)
if (pathname.startsWith('/rooms/') && typeof roomId === 'number') {

console.log('accessed!')
    



  //where the server, that serves this application lives;
  const host = 'https://mysterious-earth-97891.herokuapp.com/';

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

    ReactDOM.render(
      <Provider store={store}>
        <Description />
      </Provider>,
      document.getElementById('related-listings-app')
    );

    ReactDOM.render(
      <Provider store={store}>
        <Nav />
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

