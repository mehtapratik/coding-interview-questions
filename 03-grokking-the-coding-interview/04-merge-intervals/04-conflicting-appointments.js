/*
Given an array of intervals representing ‘N’ appointments, find out if a person can attend all the appointments.

Example 1:
Appointments: [[1,4], [2,5], [7,9]]
Output: false
Explanation: Since [1,4] and [2,5] overlap, a person cannot attend both of these appointments.

Example 2:
Appointments: [[6,7], [2,4], [8,12]]
Output: true
Explanation: None of the appointments overlap, therefore a person can attend all of them.

Example 3:
Appointments: [[4,5], [2,3], [3,6]]
Output: false
Explanation: Since [4,5] and [3,6] overlap, a person cannot attend both of these appointments.
*/

/*
Input -> [[4,5], [2,3], [3,6]]

Sort the intervals by start time
[[2,3], [3,6], [4,5]]
Compare current interval with next one
   Is current interval end time < next interval start time
      return false

return true
*/
class Interval {
   constructor(start, end) {
      this.start = start;
      this.end = end;
   }

   print_interval() {
      process.stdout.write(`[${this.start}, ${this.end}]`);
   }
}

const can_attend_all_appointments = function (intervals) {
   if (Array.isArray(intervals) === false || intervals.length < 2) return true;
   intervals.sort((a, b) => a.start - b.start);
   for (let i = 0; i < intervals.length - 1; i++) {
      const [current, next] = [intervals[i], intervals[i + 1]];
      if (current.end > next.start) return false;
   }

   return true;
};

console.log(
   `Can attend all appointments: ${can_attend_all_appointments([
      new Interval(1, 4),
      new Interval(2, 5),
      new Interval(7, 9),
   ])}`
);

console.log(
   `Can attend all appointments: ${can_attend_all_appointments([
      new Interval(6, 7),
      new Interval(2, 4),
      new Interval(8, 12),
   ])}`
);

console.log(
   `Can attend all appointments: ${can_attend_all_appointments([
      new Interval(4, 5),
      new Interval(2, 3),
      new Interval(3, 6),
   ])}`
);
