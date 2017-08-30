import React, { Component } from 'react';
import Search from './Search.js';
import Calendar from './Calendar.js';
import courseObjects from './courseObjects';
import { range, intersection } from 'lodash';
import { convertToMilitary, convertToMinutes } from './constants';


const getMatchingIndices = (listDays, match) => { //gets the indices of all elements that are equal to match param
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
  return range(start, end+1);
}

const determineTimeConflicts = (currentlyScheduled,course) => {
  for (let c of currentlyScheduled) {
    var intersect = intersection(c.days, course.days);
    if (intersect.length > 0) {
      for (let i of intersect) {
        var scheduledIndices = getMatchingIndices(c.days, i);
        var courseIndices = getMatchingIndices(course.days, i);
        if (scheduledIndices.length > 1 || courseIndices.length > 1) { //situation where there is a course with two classes in the same day
          for (let j = 0; j < Math.max(scheduledIndices.length, courseIndices.length); j++) {
            if (j < scheduledIndices.length && j < courseIndices.length) { //if they're both less than the max length, can use same index to check if course overlaps
              let scheduledRange = getTimeRange(c.times[scheduledIndices[j]]);
              let courseRange = getTimeRange(course.times[courseIndices[j]]);
              if (intersection(scheduledRange, courseRange).length > 0) {
                return false;
              }
            } else if (j < courseIndices.length) { //means that j >= scheduledIndices.length so compare previous el of schedueld courses to current el of course
              let scheduledRange = getTimeRange(c.times[scheduledIndices[j-1]]);
              let courseRange = getTimeRange(course.times[courseIndices[j]]);
              if (intersection(scheduledRange, courseRange).length > 0) {
                return false;
              }
            } else if (j < scheduledIndices.length) {
              let scheduledRange = getTimeRange(c.times[scheduledIndices[j]]);
              let courseRange = getTimeRange(course.times[courseIndices[j-1]]);
              if (intersection(scheduledRange, courseRange).length > 0) {
                return false;
              }
            }
          }
        } else { //they're both of length 1 (no courses with two classes in the same day)
          var scheduledRange = getTimeRange(c.times[scheduledIndices[0]]);
          var courseRange = getTimeRange(course.times[courseIndices[0]]);
          if (intersection(scheduledRange, courseRange).length > 0) {
            return false;
          }
        }
      }
    }
  }
  return true; //no overlap
}

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduledCourses: [],
    };
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
