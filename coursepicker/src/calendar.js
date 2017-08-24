import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';
import Timeline from './timeline.js';
import './calendar.css';
import './Popup.css';

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

function getDayIndex(day) {
  var days = ["M", "T", "W", "TH", "F"];
  if (day.includes('W')) {
    return 2;
  }
  else {
    return days.indexOf(day);
  }
}

function getHourIndex(startTime) {
  var times = [510, 570, 630, 690, 750, 810, 870, 930, 990, 1050, 1110,
                1170, 1230, 1290, 1350, 1410];
  var convertedTime = convertToMinutes(convertToMilitary(startTime));
  var closestTimeIndex = 0;
  for (var i = 0; i < times.length; i++) {
    if (convertedTime < times[i]) {
      closestTimeIndex = i;
      break;
    }
  }
  var diff = convertedTime - times[closestTimeIndex-1];
  return (closestTimeIndex-1) + (diff/60.0);


}

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      currentCourse: null
    };
    this.makeCourseBlock=this.makeCourseBlock.bind(this);
    this.addCourse=this.addCourse.bind(this);
    this.createPopup=this.createPopup.bind(this);
    this.deleteCourse=this.deleteCourse.bind(this);
  }

  makeCourseBlock = (course, day, time, index) => {
    var timeDiff = determineTimeDifference(time);
    var dayIndex = getDayIndex(day);
    var hourIndex = getHourIndex(time.split('-')[0]) //only get the first time
    var divStyle = {
      top: 105 + 53*hourIndex,
      left: 118 + 210*dayIndex,
      height: (timeDiff/60.0) * 50,
      width: 185
    };

    return (
        <div className="courseBlock" key={index} style={divStyle}
          onClick={this.createPopup.bind(this, course)}>
          {course.title}
          <br />
          {course.name}
        </div>
    );
  }

  createPopup(course) {
    var content = 'Title: ' + course.title + '\n' + 'Name: ' + course.name + '\n' +
                  'CRN: ' + course.crn + '\n' + 'Professor(s): ' + course.professors +
                  '\n' + 'Day(s) occurring: ' + course.days.toString() + '\n' +
                  'Time(s) occurring: ' + course.times.toString();
    Popup.create({
      title: null,
      content: content,
      buttons: {
        left: [{
          text: 'Delete',
          className: 'danger',
          action: () => {
            this.deleteCourse(course);
            Popup.close();
          }
        }],
        right: [{
          text: 'OK',
          action: function() {
            Popup.close();
          }
        }]
      }
    });
  }

  addCourse = (c, index) => {
    return (
      c.days.map((day, i) => this.makeCourseBlock(c, day, c.times[i]), index)
    );
  }

  deleteCourse = (course) => {
    var newCourseList = this.props.courses.filter(c => {
      return c !== course;
    });
    return (
      this.props.removedCourses(newCourseList)
    );
  }


  render() {
    return (
      <div>
        <Timeline />
        {this.props.courses.map((c, index) => this.addCourse(c, index))}
        <Popup className="mm-popup"
        btnClass="mm-popup__btn"/>
      </div>
    )
  }
}

export default Calendar;
