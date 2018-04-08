import courses from './files/parsed-courses-f18.json'; //used to be without -s18

function CourseObjects() {
  return (
    courses.map(course => ({
      crn: course['CRN'],
      title: course['Course Title'],
      name: course['Course Name'],
      professors: course['Professor(s)'],
      days: course['Day(s)'],
      times: course['Time(s)'],
      alt: course['Alternative Wednesday']
    }))
  );
}

export default CourseObjects()
