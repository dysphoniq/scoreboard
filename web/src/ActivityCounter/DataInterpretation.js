export const currentType = {
  DAY: 0,
  WEEK: 1,
  MONTH: 2,
  YEAR: 3
}
export const goalType = {
  YESTER: 0,
  GOAL: 1
}
var func = function (current, goal, entries) {
  //goalType is yesterblank (based on currentType), or goal * blank (based on curentType)
  switch(current) {
    case currentType.DAY:

  }

  //NOTE: last month vs. this month last year needs to be addressed.  Assume one for now.
  //entries are all entries needed to
  //output of type {lhs: {}, rhs: {}}
}

var calcDay(entries) {
  var today = new Date();
  //grab all entries from today
  return entries;
}

var calcWeek(today) {
    var date = new Date(today);
    var day = date.getDay();
    var diff = date.getDate() - day + (day == 0? -6:1);
    return new Date(date.getDate(diff))
}
