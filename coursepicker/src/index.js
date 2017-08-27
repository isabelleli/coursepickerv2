import React from 'react';
import ReactDOM from 'react-dom';
import Courses from './courses.js';
import Report from './reportbutton.js';
import './index.css';
// import './reset.css';

ReactDOM.render(
  <div>
    <img className="logo" src={require('./wellesley.png')}
        />
    <Report />
    <Courses />
  </div>,
  document.getElementById('root')
);
