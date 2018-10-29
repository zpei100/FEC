import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import $ from 'jquery';

//for testing in the browser
window.$ = $;

ReactDOM.render(<App />, document.getElementById('root'));
