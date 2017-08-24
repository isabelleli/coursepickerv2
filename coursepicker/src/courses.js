import React, { Component } from 'react';
import Search from './search.js';
import Calendar from './calendar.js';
import courseObjects from './courseobjects';
var _ = require('lodash');

const determineTimeConflicts = (currentlyScheduled,course) => {
  for (let c of currentlyScheduled) {
    var intersect = _.intersection(c.days, course.days);
    if (intersect.length > 0) {
      for (let i of intersect) {
        var dayIndex1 = c.days.indexOf(i);
        var dayIndex2 = course.days.indexOf(i);
        if (c.times[dayIndex1] === course.times[dayIndex2]) {
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
