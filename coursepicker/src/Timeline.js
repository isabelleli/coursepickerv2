import React, { Component } from 'react';
import './styles/Timeline.css';
import { TIMES, DAYS } from './constants';

const TimeSetup = () => {
  return (
    <div className="time-container">
      {TIMES.map(t => <div className="time" key={t}>{t}</div>)}
    </div>
  );
}

const DaySetup = () => {
  return (
    <div className="day-container">
      {DAYS.map(d => <div className="day" key={d}>{d}</div>)}
    </div>
  );
}

class Timeline extends Component {
  render() {
    return (
      <div>
        <TimeSetup />
        <DaySetup />
      </div>
    );
  };
}


export default Timeline;
