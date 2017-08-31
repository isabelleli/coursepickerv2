import React from 'react';
import ReactDOM from 'react-dom';
import Courses from './Courses.js';
import './styles/index.css';

ReactDOM.render(
  <div>
    <a href='https://courses.wellesley.edu/' target="_blank"
    rel="noopener noreferrer">
    <img className="logo" alt="wellesley logo"
      src={require('./images/wellesley.png')}></img></a>
    <a href='https://goo.gl/FvoS8z' target="_blank" rel="noopener noreferrer"
    className='button'>  Report Issues</a>
    <Courses />
    <a href='https://github.com/isabelleli/coursepickerv2' target="_blank"
    rel="noopener noreferrer">
    <img className="github-logo" alt="github logo"
      src={require('./images/github.png')}></img></a>
  </div>,
  document.getElementById('root')
);
