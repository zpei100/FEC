import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import { Provider } from 'react-redux';
import {
  floatButtonWhenEntering,
  highlightImageOnHover
} from './helpers/initialize';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import RelatedListings from '../src/components/carousel/RelatedListings';
import Description from '../src/components/description/Description';
import Gallery from '../src/components/gallery/Gallery';
import Nav from '../src/components/navbar/Nav';

import rootReducer from './reducers/rootReducer';

const pathname = window.location.pathname;
const roomId = parseInt(pathname.slice(7));


if (pathname.startsWith('/rooms/') && typeof roomId === 'number') {
  console.log('accessed!');

  const host = 'http://mysterious-earth-97891.herokuapp.com/';

  ReactDOM.render(
    <Nav />,
    document.getElementById('nav-app')
  );

  console.log('this part is reached . about to axios call')

  axios.get(`${host}csr/${roomId}`).then(({ data }) => {
    const { room, relatedListings, user } = data;
    const store = createStore(rootReducer, {room, relatedListings, user}, applyMiddleware(thunk) )
    console.log(`${host}csr/${roomId}`);
    console.log('room id is: ', roomId);


    data = JSON.stringify(data);
    console.log('data : ', data);
    console.log('store: ', data.getState());

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
      document.getElementById('description-app')
    );

    $(document).ready(function() {
      const $galleryImages = $('.gallery img');
      const $fourthImage = $('.img4');
      const $viewPhoto = $('.button-bottom');

      highlightImageOnHover($galleryImages);
      floatButtonWhenEntering($fourthImage);
      floatButtonWhenEntering($viewPhoto);
    });
  });
}
