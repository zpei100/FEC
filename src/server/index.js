import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import compression from 'compression';

import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Room, User } from './db/schema';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import rootReducer from '../client/src/reducers/rootReducer';
import Gallery from '../client/src/components/gallery/Gallery';
import RelatedListings from '../client/src/components/carousel/RelatedListings';

const template = function(
  initialState = {},
  content_one = '',
  content_two = ''
) {
  const scripts = content_one
    ? `<script>window.__initialState__ = ${JSON.stringify(
        initialState
      )}</script><script src="client.js"></script>`
    : `<script src="bundle.js"></script>`;

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B"
      crossorigin="anonymous">
    <title>FEC</title>
    <base href="/" target="_blank">
    <link rel="stylesheet" href="styles.css" />
  </head>
  
  <body>
    <div id="root">
      <div id="gallery-app">${content_one}</div>
      SOME OTHER THINGS GO HERE, LIKE OTHER APPS
      <div id="related-listings-app">${content_two}</div>
    </div>
  
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
      crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em"
      crossorigin="anonymous"></script>
  
    <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
  
    ${scripts}
  </body>
  
  </html>
  `;
  return html;
};

const app = express();

app.use(compression());
app.use(bodyParser());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../../dist')));
app.use(
  session({
    secret: 'password',
    saveUninitialized: true,
    resave: false
  })
);

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

app.get('/rooms/:id', function(req, res) {
  //id defaults to 15 for development environment;
  const userId = req.session.user ? req.session.user : 15;

  try {
    const id = parseInt(req.params.id);
    if (typeof id !== 'number') throw new Error('id invalid');

    Room.find({ id }).then(rooms => {

      let relatedListings = [];
      const room = rooms[0];
      const related = room.related;
  
      related.forEach((id, idx, related) => {
        Room.find({ id }).then(rooms => {
          relatedListings.push(rooms[0]);
          if (relatedListings.length === related.length) {
            User.find({ id: userId }).then(users => {
              const { favorites, id, username } = users[0];
              const user = {favorites, id, username }
              const store = createStore(rootReducer, { room, relatedListings, user }, applyMiddleware(thunk));
              const initialState = store.getState();
              const content_one = renderToString(
                <Provider store={store}>
                  <Gallery />
                </Provider>
              );
  
              const content_two = renderToString(
                <Provider store={store}>
                  <RelatedListings />
                </Provider>
              );
  
              const html = template(initialState, content_one, content_two);
              res.status(200).send(html);
            }).catch(() => res.status(404));
          }
        }).catch(() => res.status(404));;
      });
    });
  } catch(err) {
    res.status(404)
  }
});

//routes to initialize csr client

app.get('/getRoom/:id', function(req, res) {
  const userId = req.session.user ? req.session.user : 15;

  try {
    const id = parseInt(req.params.id);
    if (typeof id !== 'number') throw new Error('id invalid');

    Room.find({ id }).then(rooms => {

      let relatedListings = [];
      const room = rooms[0];
      const related = room.related;
  
      related.forEach((id, idx, related) => {
        Room.find({ id }).then(rooms => {
          relatedListings.push(rooms[0]);
          if (relatedListings.length === related.length) {
            User.find({ id: userId }).then(users => {
              const { favorites, id, username } = users[0];
              const user = {favorites, id, username }
              const store = createStore(rootReducer, { room, relatedListings, user }, applyMiddleware(thunk));
              const initialState = store.getState();
              const content_one = renderToString(
                <Provider store={store}>
                  <Gallery />
                </Provider>
              );
  
              const content_two = renderToString(
                <Provider store={store}>
                  <RelatedListings />
                </Provider>
              );
  
              res.status(200).send({initialState, content_one, content_two});
            }).catch(() => res.status(404));
          }
        }).catch(() => res.status(404));;
      });
    });
  } catch(err) {
    res.status(404)
  }
})



app.get('/csr/getUser', function(req, res) {
  const userId = req.session.user ? req.session.user : 15;

  User.find({ id: userId }).then(users => {
    const user = users[0];
    res.send(user);
  }).catch(() => res.status(404));
})

app.get('/csr/:id', function(req, res) {
  const id = parseInt(req.params.id);
  Room.find({ id }).then(rooms => {
    const room = rooms[0];
    res.send(room);
  }).catch(() => res.status(404));
})

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`server up on port ${port}`);
});
