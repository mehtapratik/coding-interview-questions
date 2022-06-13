/*
Given two lists of intervals, find the intersection of these two lists. Each list consists 
of disjoint intervals sorted on their start time.

Example 1:
Input: arr1=[[1, 3], [5, 6], [7, 9]], arr2=[[2, 3], [5, 7]]
Output: [2, 3], [5, 6], [7, 7]
Explanation: The output list contains the common intervals between the two lists.

Example 2:
Input: arr1=[[1, 3], [5, 7], [9, 12]], arr2=[[5, 10]]
Output: [5, 7], [9, 10]
Explanation: The output list contains the common intervals between the two lists.
*/
class Interval {
   constructor(start, end) {
      this.start = start;
      this.end = end;
   }

   print_interval() {
      console.log(`[${this.start}, ${this.end}]`);
   }
}

const merge = function (intervalA, intervalB) {
   const overlaps = [];
   let i = 0;
   let j = 0;

   while (i < intervalA.length && j < intervalB.length) {
      const a = intervalA[i];
      const b = intervalB[j];

      // Examples of b starting inside a
      // ________       ________       ________
      //   ___          ____                _____
      // Examples of a starting inside b
      //   ___          ____                _____
      // ________       ________       ________
      if (doesOverlap(a, b) || doesOverlap(b, a)) {
         overlaps.push(
            new Interval(Math.max(a.start, b.start), Math.min(a.end, b.end))
         );
      }

      // which interval moves depends on which one is ending earlier
      if (a.end < b.end) {
         i++;
      } else {
         j++;
      }
   }

   return overlaps;
};

function doesOverlap(source, target) {
   // checks if target interval falls inside start/end boundary of source interval
   return source.start <= target.start && source.end >= target.start;
}

let result = merge(
   [new Interval(1, 3), new Interval(5, 6), new Interval(7, 9)],
   [new Interval(2, 3), new Interval(5, 7)]
);
for (i = 0; i < result.length; i++) {
   result[i].print_interval();
}
console.log();

console.log("Intervals Intersection: ");
result = merge(
   [new Interval(1, 3), new Interval(5, 7), new Interval(9, 12)],
   [new Interval(5, 10)]
);
for (i = 0; i < result.length; i++) {
   result[i].print_interval();
}
console.log();
