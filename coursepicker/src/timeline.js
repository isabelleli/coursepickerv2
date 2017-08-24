import React, { Component } from 'react';
import './timeline.css';

const times = ["08:30 AM", "09:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", "01:30 PM",
              "02:30 PM", "03:30 PM", "04:30 PM", "05:30 PM", "06:30 PM",
              "07:30 PM", "08:30 PM", "09:30 PM",  "10:30 PM","11:30 PM"];
// const times = ["08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
//               "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM",
//               "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
//               "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM",
//               "10:30 PM", "11:00 PM", "11:30 PM"];
const divTimes = times.map(t =>
  <div className="time" key={t}>{t}</div>
);

const TimeSetup = () => {
  return (
    <div className="time-container">
      <div>{ divTimes }</div>
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


export default Timeline
// import BigCalendar from 'react-big-calendar';
// import moment from 'moment';
//
// // Setup the localizer by providing the moment (or globalize) Object
// // to the correct localizer.
// BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
//
// const MyCalendar = props => (
//   <div>
//     <BigCalendar
//       startAccessor='startDate'
//       endAccessor='endDate'
//     />
//   </div>
// );
//
// export default MyCalendar
