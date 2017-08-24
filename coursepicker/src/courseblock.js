import React from 'react';
import './courseblock.css';

function determineTimeDifference(t) {
  var timePeriod = t.split('-');
  var time1 = convertToMinutes(convertToMilitary(timePeriod[0]));
  var time2 = convertToMinutes(convertToMilitary(timePeriod[1]));
  return time2-time1;
}

function convertToMilitary(t) { //format is: "08:30 AM"
  if (t.includes('AM')) {
    return t.replace('AM', '').trim();
  }
  else {
    var timeOnly = t.replace('PM', '').trim();
    var separateTime = timeOnly.split(':')
    if (separateTime[0] !== '12') {
      var newHour = parseInt(separateTime[0]) + 12;
      return newHour.toString() + ':' + separateTime[1];
    } else {
      return timeOnly;
      }
    }
  }

function convertToMinutes(t) {
  var time = t.split(':');
  return (parseInt(time[0])*60)+ parseInt(time[1]);
}

const makeCourseBlock = (c, index) => { //takes in course object
  var t = (c.times)[0];
  var diff = determineTimeDifference(t);
  var divStyle = {
    height: (diff/60.0 * 54),
    width: 185
  };

  return (
      <div className="courseBlock" key={index} style={divStyle} />
  );
}

export default makeCourseBlock;
