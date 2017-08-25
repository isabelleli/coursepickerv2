import React, { Component } from 'react';
import Search from './search.js';
import Calendar from './calendar.js';
import courseObjects from './courseobjects';
var _ = require('lodash');

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

const determineTimeConflicts = (currentlyScheduled,course) => {
  for (let c of currentlyScheduled) {
    var intersect = _.intersection(c.days, course.days);
    if (intersect.length > 0) {
      for (let i of intersect) {
        var dayIndex1 = c.days.indexOf(i);
        var dayIndex2 = course.days.indexOf(i);
        var timeRange = c.times[dayIndex1].split('-');
        var time1 = convertToMinutes(convertToMilitary(timeRange[0]));
        var time2 = convertToMinutes(convertToMilitary(timeRange[1]));
        var courseTime = convertToMinutes(convertToMilitary(course.times[dayIndex2].split('-')[0]));
        console.log(courseTime);
        if (courseTime >= time1 && courseTime <= time2) {
          return false;
        }
      }
    }
  }
  return true;
}

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduledCourses: [],
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.filterCourses=this.filterCourses.bind(this);
  }

  handleSelection = (suggestion) => {
    this.setState({
      scheduledCourses: [...this.state.scheduledCourses, suggestion],
    });
  }

  handleRemovedCourse = (newCourseList) => {
    this.setState({
      scheduledCourses: newCourseList
    });
  }

  filterCourses = () => {
    var currentlyScheduled = this.state.scheduledCourses;
    return (
      courseObjects.filter(course =>
          determineTimeConflicts(currentlyScheduled, course)
      )
    );
  }



  render() {
    return (
      <div>
        <Search handleSelection={this.handleSelection}
        filteredCourses={this.filterCourses()}/>
        <Calendar courses={this.state.scheduledCourses}
        removedCourses={this.handleRemovedCourse} />
      </div>
    );
  }
}

export default Courses;
