/*
Given a list of non-overlapping intervals sorted by their start time, insert a given interval at 
the correct position and merge all necessary intervals to produce a list that has only mutually 
exclusive intervals.

Example 1:
Input: Intervals=[[1,3], [5,7], [8,12]], New Interval=[4,6]
Output: [[1,3], [4,7], [8,12]]
Explanation: After insertion, since [4,6] overlaps with [5,7], we merged them into one [4,7].

Example 2:
Input: Intervals=[[1,3], [5,7], [8,12]], New Interval=[4,10]
Output: [[1,3], [4,12]]
Explanation: After insertion, since [4,10] overlaps with [5,7] & [8,12], we merged them into [4,12].

Example 3:
Input: Intervals=[[2,3],[5,7]], New Interval=[1,4]
Output: [[1,4], [5,7]]
Explanation: After insertion, since [1,4] overlaps with [2,3], we merged them into one [1,4].
*/

class Interval {
   constructor(start, end) {
      this.start = start;
      this.end = end;
   }

   print_interval() {
      return "[" + this.start + ", " + this.end + "]";
   }
}

const insert = function (intervals, newInterval) {
   const result = [];

   // flag to indicate that new interval has been merged with overlapping intervals from the array
   let newMerged = false;
   for (let interval of intervals) {
      if (isOverlapping(interval, newInterval)) {
         // set this flag to true to indicate that you've merged overlapping intervals
         newMerged = true;
         newInterval.start = Math.min(interval.start, newInterval.start);
         newInterval.end = Math.max(interval.end, newInterval.end);
      } else {
         // If true, that means all overlapping intervals are merged. Since intervals array is sorted by start time,
         // all future intervals are not going to be overlapping. It is safe to push new interval into resulting array.
         // Set newMerged flag to false to avoid adding newInterval multiple time in resulting array
         if (newMerged) {
            result.push(newInterval);
            newMerged = false;
         }
         result.push(interval);
      }
   }

   // if new interval overlaps until the end of the intervals array, then we will need to add
   // merged interval outside of the loop, e.g. interval = [1,3] [4, 10] newInterval = [7, 15]
   if (newMerged) result.push(newInterval);

   return result;
};

function isOverlapping(a, b) {
   if (a.start <= b.start && a.end > b.start) {
      // b starts after a
      // e.g.
      // __________        a     OR    ___________
      //       ________    by             _____
      return true;
   } else if (b.start <= a.start && b.end > a.start) {
      // a starts after b
      // e.g.
      //       ________    a   OR         ______
      // __________        by           __________
      return true;
   }
   return false;
}

// console.log(isOverlapping(new Interval(1, 5), new Interval(3, 6)));
// console.log(isOverlapping(new Interval(3, 6), new Interval(1, 5)));
// console.log(isOverlapping(new Interval(3, 6), new Interval(1, 2)));
// console.log(isOverlapping(new Interval(1, 10), new Interval(3, 5)));
// console.log(isOverlapping(new Interval(3, 5), new Interval(1, 10)));

console.log("Intervals after inserting the new interval: ");
let result = insert(
   [new Interval(1, 3), new Interval(5, 7), new Interval(8, 12)],
   new Interval(4, 6)
);
console.log(result);
console.log();

console.log("Intervals after inserting the new interval: ");
result = insert(
   [new Interval(1, 3), new Interval(5, 7), new Interval(8, 12)],
   new Interval(4, 10)
);
console.log(result);
console.log();

console.log("Intervals after inserting the new interval: ");
result = insert([new Interval(2, 3), new Interval(5, 7)], new Interval(1, 4));
console.log(result);
console.log();
