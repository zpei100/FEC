import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import compression from 'compression';

import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import { Room, User } from './db/schema';
import rootReducer from '../client/reducers/rootReducer';
import Gallery from '../client/components/gallery/Gallery';
import RelatedListings from '../client/components/relatedListings/RelatedListings';
import Nav from '../client/components/navbar/Nav';
import Description from '../client/components/description/Description';
import CarouselModal from '../client/components/modal/CarouselModal';

import { getRoomAndUserInfo } from './handlers/getRoomAndUserInfo';

const app = express();

app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../../dist')));
app.use(
  session({
    secret: 'password',
    saveUninitialized: true,
    resave: false
  })
);

//request handlers;
app.post('/updateFavorites', function(req, res) {

  const userId = req.session.user ? req.session.user : 15;
  const {id} = req.body;

  User.find({id: userId}).then(users => {
    let currentFavorites = users[0].favorites;

    const len = currentFavorites.length;
    currentFavorites = currentFavorites.filter(num => num !== id);
    if (currentFavorites.length === len) currentFavorites.push(id);

    User.findOneAndUpdate({id: userId}, {favorites: currentFavorites}).then(result => {
      res.status(200).send(result.favorites);
    }).catch(() => res.status(404));
  })
})

app.get('/getRoom/:id', function(req, res) {
  getRoomAndUserInfo(req).then(({ room, relatedListings, user}) => {
    const store = createStore(rootReducer, { room, relatedListings, user }, applyMiddleware(thunk));
    const initialState = store.getState();
    const galleryHtml = renderToString(
      <Provider store={store}>
        <Gallery />
      </Provider>
    );

    const relatedListingsHtml = renderToString(
      <Provider store={store}>
        <RelatedListings />
      </Provider>
    );

    const navHtml = renderToString(
      <Provider store={store}>
        <Nav />
      </Provider>
    );

    const descriptionHtml = renderToString(
      <Provider store={store}>
        <Description />
      </Provider>
    );

    const modalHtml = renderToString(
      <Provider store={store}>
        <CarouselModal />
      </Provider>
    );

    res.status(200).send({initialState, navHtml, modalHtml, descriptionHtml, galleryHtml, relatedListingsHtml});
  }).catch(() => res.status(404));
})

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`server up on port ${port}`);
});