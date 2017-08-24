import React from 'react';
import courses from './parsed-courses.json';

function courseObjects() {
  return (
    courses.map(course => ({
      crn: course['CRN'],
      title: course['Course Title'],
      name: course['Course Name'],
      professors: course['Professor(s)'],
      days: course['Day(s)'],
      times: course['Time(s)']
    }))
  );
}

export default courseObjects()
