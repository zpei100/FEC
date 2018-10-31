import express from 'express';
import { Room } from './db/schema';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import App from '../client/src/components/App';

import rootReducer from '../client/src/reducers/rootReducer';

//need to webpack two different files
const template = function(initialState = {}, content = '') {
  const scripts = content
    ? `<script>window.__initialState__ = ${initialState}</script><script src="client.js"></script>`
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
  </head>
  
  <body>
    <div id="root">${content}</div>
  
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

app.use(bodyParser());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/room/:id', function(req, res) {

  const id = parseInt(req.params.id);
  console.log(id);
  Room.find({ id }).then(rooms => {
    const room = rooms[0];
    const store = createStore(rootReducer, { room });
    const initialState = store.getState();

    const content = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const html = template(initialState, content);

    res.send(html);
  });
  //templating needed to inject roomid into html somehow, for now, front end sends get request with id to
  //to get data; fix later !!!!!!
});

app.listen(4000, function() {
  console.log('port is up on port 4000');
});
