import React, { Component } from 'react';
import Checkbox from './Checkbox.js';
import InputForm from './InputForm.js';
import ChooseTime from './ChooseTime.js';
import './styles/ChooseTime.css';

const Form = () => {
  return (
    <div>
      <div className="title"> Title <InputForm /> </div>
      <div className="checkbox">Monday
        <Checkbox className="M"/>
      </div>
      <div className="checkbox">
        Tuesday
        <Checkbox className="T"/>
      </div>
      <div className="checkbox">
        Wednesday
        <Checkbox className="W"/>
      </div>
      <div className="checkbox">
        Thursday
        <Checkbox className="TH"/>
      </div>
      <div className="checkbox">
        Saturday
        <Checkbox className="F"/>
      </div>
      <ChooseTime />
    </div>

  )
}
export default Form
