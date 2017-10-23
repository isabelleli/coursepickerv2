import { range, intersection } from 'lodash';

export const COLORS = ['#f7e87f', '#f7cb7f', '#a6cff1', '#b0f1cc', '#f6a2eb',
                '#f7837f','#7f9df7','#6aa2ec'];

export const TIMES = ["08:30 AM","09:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", "01:30 PM",
                              "02:30 PM", "03:30 PM", "04:30 PM", "05:30 PM", "06:30 PM",
                              "07:30 PM", "08:30 PM", "09:30 PM",  "10:30 PM","11:30 PM"];

export const MILITARY_TIMES = [510, 570, 630, 690, 750, 810, 870, 930, 990, 1050, 1110,
                              1170, 1230, 1290, 1350, 1410];

export const DAYS = ["M", "T", "W", "TH", "F"];

export const convertToMilitary = (t) => { //format is: "08:30 AM"
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

export const convertToMinutes = (t) => {
  var time = t.split(':');
  return (parseInt(time[0], 10)*60)+ parseInt(time[1], 10);
}

export const getMatchingIndices = (listDays, match) => { //gets the indices of all elements that are equal to match param
  var indices = [];
  for (var i = 0; i < listDays.length; i++) {
    if (listDays[i] === match) {
      indices.push(i)
    }
  }
  return indices;
}

export const getTimeRange = (time) => {
  var splitTime = time.split('-');
  var start = convertToMinutes(convertToMilitary(splitTime[0]));
  var end = convertToMinutes(convertToMilitary(splitTime[1]));
  return range(start, end+1);
}

export const determineTimeConflicts = (currentlyScheduled,course) => {
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
