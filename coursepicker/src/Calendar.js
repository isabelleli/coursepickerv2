import React, { Component } from 'react';
import Popup from 'react-popup';
import Timeline from './Timeline.js';
import './styles/Calendar.css';
import './styles/Popup.css';
import { convertToMilitary, convertToMinutes, COLORS } from './constants';
import { MILITARY_TIMES, DAYS } from './constants';

// returns the difference in minutes between the start and end time of a course
function determineTimeDifference(t) {
  var timePeriod = t.split('-');
  var time1 = convertToMinutes(convertToMilitary(timePeriod[0]));
  var time2 = convertToMinutes(convertToMilitary(timePeriod[1]));
  return time2-time1;
}

function getDayIndex(day) {
  // if (day.includes('W')) { //only applicable for old parsed-courses file
  //   return 2;
  // }
  // else {
  return DAYS.indexOf(day);
  // }
}

function getHourIndex(startTime) {
  var convertedTime = convertToMinutes(convertToMilitary(startTime));
  var closestTimeIndex = 0;
  for (var i = 0; i < MILITARY_TIMES.length; i++) {
    if (convertedTime < MILITARY_TIMES[i]) {
      closestTimeIndex = i;
      break;
    }
  }
  var diff = convertedTime - MILITARY_TIMES[closestTimeIndex-1];
  return (closestTimeIndex-1) + (diff/60.0);
}

class Calendar extends Component {

  makeCourseBlock = (course, day, time, index) => {
    var timeDiff = determineTimeDifference(time);
    var dayIndex = getDayIndex(day);
    var hourIndex = getHourIndex(time.split('-')[0]); //only get the first time

    var divStyle = {
      top: 120 + 37*hourIndex,
      left: 162 + 202*dayIndex,
      height: (timeDiff/60.0) * 38,
      width: 180,
      backgroundColor: COLORS[index%COLORS.length]
    };
    return (
        <div className="courseBlock" key={course.crn + day + time}
          style={divStyle} onClick={this.createPopup.bind(this, course, day, time)}>
          <div className="courseTitle">{course.title}</div>
          <div className="courseName">{course.name}</div>
        </div>
    );
  }

    createPopup = (course, day, time) => {

    var content = 'Title: ' + course.title + '\n' + 'Name: ' + course.name + '\n' +
                 'Professor(s): ' + course.professors + '\n' + 'CRN: ' + course.crn +
                 '\n' + 'Time: ' + day + ' ' + time;
    if (day === 'W' && course.alt !== undefined) {
      content += '\n' + 'Alternative Wednesday: ' + course.alt;
    }
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
      c.days.map((day, i) => this.makeCourseBlock(c, day, c.times[i], index))
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
        <Popup className="mm-popup" btnClass="mm-popup__btn"/>
      </div>
    )
  }
}

export default Calendar
