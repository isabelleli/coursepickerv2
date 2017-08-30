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
