import React, { Component } from 'react';
import Search from './Search.js';
import Calendar from './Calendar.js';
import CourseObjects from './CourseObjects.js';
// import UserBlocks from './UserBlocks.js';
import { convertToMilitary, convertToMinutes, getMatchingIndices } from './constants';
import { getTimeRange, determineTimeConflicts } from './constants';

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
      CourseObjects.filter(course =>
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
        {/* <UserBlocks scheduled={this.state.scheduledCourses} /> */}
      </div>
    );
  }
}

export default Courses;
