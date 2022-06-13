/*
Given a list of intervals, merge all the overlapping intervals to produce a list that has only mutually exclusive intervals.

Example 1:
Intervals: [[1,4], [2,5], [7,9]]
Output: [[1,5], [7,9]]
Explanation: Since the first two intervals [1,4] and [2,5] overlap, we merged them into one [1,5].

Example 2:
Intervals: [[6,7], [2,4], [5,9]]
Output: [[2,4], [5,9]]
Explanation: Since the intervals [6,7] and [5,9] overlap, we merged them into one [5,9].

Example 3:
Intervals: [[1,4], [2,6], [3,5]]
Output: [[1,6]]
Explanation: Since all the given intervals overlap, we merged them into one.
*/

class Interval {
   constructor(start, end) {
      this.start = start;
      this.end = end;
   }

   get_interval() {
      return "[" + this.start + ", " + this.end + "]";
   }
}

const merge = function (intervals) {
   // Invalid array or array with only one interval
   if (!Array.isArray(intervals) && intervals.length < 2) return intervals;

   // Sort the interval by start values in each tuple
   intervals.sort((a, b) => a.start - b.start);

   // Start with first interval
   let start = intervals[0].start;
   let end = intervals[0].end;
   const merged = [];

   for (let i = 1; i < intervals.length; i++) {
      const current = intervals[i];

      // current interval's start is smaller or equal to previous interval's end.
      // take the max value from previous and current interval
      if (current.start <= end) {
         end = Math.max(current.end, end);
         // we're not pushing start and end into merged interval yet.
         // forthcoming intervals might still overlap.
      } else {
         // Updated merged intervals so far before resetting
         // new `start` and `end` interval that does not
         // overlap with current one
         merged.push(new Interval(start, end));
         start = current.start;
         end = current.end;
      }
   }
   // Push last start and end values into array
   merged.push(new Interval(start, end));

   return merged;
};

merged_intervals = merge([
   new Interval(1, 4),
   new Interval(2, 5),
   new Interval(7, 9),
]);
result = "";
for (i = 0; i < merged_intervals.length; i++) {
   result += merged_intervals[i].get_interval() + " ";
}
console.log(`Merged intervals: ${result}`);

merged_intervals = merge([
   new Interval(6, 7),
   new Interval(2, 4),
   new Interval(5, 9),
]);
result = "";
for (i = 0; i < merged_intervals.length; i++) {
   result += merged_intervals[i].get_interval() + " ";
}
console.log(`Merged intervals: ${result}`);

merged_intervals = merge([
   new Interval(1, 4),
   new Interval(2, 6),
   new Interval(3, 5),
]);
result = "";
for (i = 0; i < merged_intervals.length; i++) {
   result += merged_intervals[i].get_interval() + " ";
}
console.log(`Merged intervals: ${result}`);
