import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import $ from 'jquery';
import './lib/gallery_styles.css';
import './lib/modal_styles.css';
import './lib/rating_styles.css';

//for testing in the browser
window.$ = $;

ReactDOM.render(<App />, document.getElementById('root'));
