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
      var newHour = parseInt(separateTime[0], 10) + 12;
      return newHour.toString() + ':' + separateTime[1];
    } else {
      return timeOnly;
      }
    }
  }

function convertToMinutes(t) {
  var time = t.split(':');
  return (parseInt(time[0], 10)*60)+ parseInt(time[1], 10);
}

const getMatchingIndices = (listDays, match) => {
  var indices = [];
  for (var i = 0; i < listDays.length; i++) {
    if (listDays[i] === match) {
      indices.push(i)
    }
  }
  return indices;
}

const getTimeRange = (time) => {
  var splitTime = time.split('-');
  var start = convertToMinutes(convertToMilitary(splitTime[0]));
  var end = convertToMinutes(convertToMilitary(splitTime[1]));
  return _.range(start, end+1);
}

const determineTimeConflicts = (currentlyScheduled,course) => {
  for (let c of currentlyScheduled) {
    var intersect = _.intersection(c.days, course.days);
    if (intersect.length > 0) {
      for (let i of intersect) {
        var scheduledIndices = getMatchingIndices(c.days, i);
        var courseIndices = getMatchingIndices(course.days, i);
        if (scheduledIndices.length > 1 || courseIndices.length > 1) {
          for (let j = 0; j < Math.max(scheduledIndices.length, courseIndices.length); j++) { //for situations when there are two classes on the same day
            if (j < scheduledIndices.length && j < courseIndices.length) {
              let scheduledRange = getTimeRange(c.times[scheduledIndices[j]]);
              let courseRange = getTimeRange(course.times[courseIndices[j]]);
              if (_.intersection(scheduledRange, courseRange).length > 0) {
                return false;
              }
            } else if (j < courseIndices.length) {
              let scheduledRange = getTimeRange(c.times[scheduledIndices[j-1]]);
              let courseRange = getTimeRange(course.times[courseIndices[j]]);
              if (_.intersection(scheduledRange, courseRange).length > 0) {
                return false;
              }
            } else if (j < scheduledIndices.length) {
              let scheduledRange = getTimeRange(c.times[scheduledIndices[j]]);
              let courseRange = getTimeRange(course.times[courseIndices[j-1]]);
              if (_.intersection(scheduledRange, courseRange).length > 0) {
                return false;
              }
            }
          }
        } else {
          var scheduledRange = getTimeRange(c.times[scheduledIndices[0]]);
          var courseRange = getTimeRange(course.times[courseIndices[0]]);
          if (_.intersection(scheduledRange, courseRange).length > 0) {
            return false;
          }
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
