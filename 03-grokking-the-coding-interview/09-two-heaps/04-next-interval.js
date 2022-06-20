//
// INSTRUCTIONS
//
// Given an array of intervals, find the next interval of each interval. In a list of intervals,
// for an interval ‘i’ its next interval ‘j’ will have the smallest ‘start’ greater than or
// equal to the ‘end’ of ‘i’.
//
// Write a function to return an array containing indices of the next interval of each input
// interval. If there is no next interval of a given interval, return -1. It is given that
// none of the intervals have the same start point.
//

//
// EXAMPLE 1
//
// Input: Intervals [[2,3], [3,4], [5,6]]
// Output: [1, 2, -1]
// Explanation: The next interval of [2,3] is [3,4] having index ‘1’. Similarly, the next interval
// of [3, 4] is [5, 6] having index ‘2’. There is no next interval for [5, 6] hence we have ‘-1’.

//
// EXAMPLE 2
//
// Input: Intervals [[1,5], [4,6], [3,4]]
// Output: [-1, -1, 1]
// Explanation: The next interval of [3,4] is [4,6] which has index ‘1’. There is no next interval for [1,5] and [4,6].
//

//
// PREPARATION
//
// Use Heap (min/max) from collection JS
//
class Interval {
   constructor(start, end) {
      this.start = start;
      this.end = end;
   }
}

//
// CODE
//

const find_next_interval = function (intervals) {
   const intervalCount = intervals.length;

   const result = new Array(intervalCount).fill(-1);

   // Initialize two heaps
   // One with highest start time on top
   // Another with highest end time on top
   const maxStartTimeHeap = new Heap([], null, (a, b) => a[0] - b[0]);
   const maxEndTimeHeap = new Heap([], null, (a, b) => a[0] - b[0]);
   for (let i = 0; i < intervalCount; i++) {
      maxStartTimeHeap.push([intervals[i].start, i]);
      maxEndTimeHeap.push([intervals[i].end, i]);
   }

   // Keep looking into end time heap
   while (maxEndTimeHeap.length > 0) {
      const [endTime, endTimeIdx] = maxEndTimeHeap.pop();

      // Find next start time that is greater than or equal to the current
      // end time. Make sure it is closest start time, i.e. if current interval
      // is [1,3], i.e. end time = 3, closest start time would be 3 and not 5.
      let startInterval = null;
      let startTimeIdx = -1;
      while (
         maxStartTimeHeap.length > 0 &&
         maxStartTimeHeap.peek()[0] >= endTime
      ) {
         [startInterval, startTimeIdx] = maxStartTimeHeap.pop();
      }

      result[endTimeIdx] = startTimeIdx;

      // Push back last start time element popped from start time
      // heap because it could be an interval for next end time as well
      if (startInterval) {
         maxStartTimeHeap.push([startInterval, startTimeIdx]);
      }
   }

   return result;
};

//
// TEST
//

let result = find_next_interval([
   new Interval(2, 3),
   new Interval(3, 4),
   new Interval(5, 6),
]);
console.log(`Next interval indices are: ${result}`);

result = find_next_interval([
   new Interval(1, 5),
   new Interval(4, 6),
   new Interval(3, 4),
]);
console.log(`Next interval indices are: ${result}`);
