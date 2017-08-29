import React, { Component } from 'react';
import './styles/Timeline.css';

const times = ["08:30 AM","09:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", "01:30 PM",
              "02:30 PM", "03:30 PM", "04:30 PM", "05:30 PM", "06:30 PM",
              "07:30 PM", "08:30 PM", "09:30 PM",  "10:30 PM","11:30 PM"];

const divTimes = times.map(t =>
  <div className="time" key={t}>{t}</div>
);

const TimeSetup = () => {
  return (
    <div className="time-container">
      {divTimes}
    </div>
  );
}

const DaySetup = () => {
  return (
    <div className="day-container">
      <div className="day">M</div>
      <div className="day">T</div>
      <div className="day">W</div>
      <div className="day">TH</div>
      <div className="day">F</div>
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
