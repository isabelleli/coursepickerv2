import React from 'react';
import ReactDOM from 'react-dom';
import Courses from './courses.js';
import Report from './reportbutton.js';
import './index.css';
// import './reset.css';

ReactDOM.render(
  <div>
    <a href='https://courses.wellesley.edu/' target="_blank"
    rel="noopener noreferrer">
    <img className="logo" alt="wellesley logo"
      src={require('./wellesley.png')}></img></a>
    <Report />
    <Courses />
  </div>,
  document.getElementById('root')
);
