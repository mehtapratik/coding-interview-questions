//
// INSTRUCTIONS
//
// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and
// an integer k, return the k closest points to the origin(0, 0).
//
// The distance between two points on the X-Y plane is the Euclidean distance
// (i.e., √(x1 - x2)2 + (y1 - y2)2).
//
// You may return the answer in any order. The answer is guaranteed to be unique
// (except for the order that it is in).
//

//
// EXAMPLES
//
// Example 1
// https://assets.leetcode.com/uploads/2021/03/03/closestplane1.jpg
// Input: points = [[1,3],[-2,2]], k = 1
// Output: [[-2,2]]
// Explanation:
// The distance between (1, 3) and the origin is sqrt(10).
// The distance between (-2, 2) and the origin is sqrt(8).
// Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
// We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
//
// Example 2
// Input: points = [[3,3],[5,-1],[-2,4]], k = 2
// Output: [[3,3],[-2,4]]
// Explanation: The answer [[-2,4],[3,3]] would also be accepted.
//

//
// CODE
//
// Code you will write to solve the asked problem
function solve(points, k) {
   return quickSelect(points, k);
   // return heapSolution(points, k);
}

function heapSolution(points, k) {
   if (k > points.length) {
      return points;
   }
   if (k < 1) {
      return [];
   }

   const heap = new Heap([], null, (a, b) => a[1] - b[1]);

   for (let point of points) {
      const distance = dist(point);
      if (heap.length < k || heap.peek()[1] > distance) {
         if (heap.length >= k) {
            heap.pop();
         }
         heap.push([point, distance]);
      }
   }

   return heap.length === 0 ? [] : heap.toArray().map((v) => v[0]);
}

function quickSelect(points, k) {
   if (k <= 0) {
      return [];
   }
   if (points.length < k) {
      return points;
   }

   let start = 0;
   let end = points.length - 1;
   let pivot;

   while (pivot !== k) {
      pivot = partition(points, start, end);

      if (pivot < k) {
         start = pivot;
      } else {
         end = pivot - 1;
      }
   }

   return points.slice(0, k);
}

function partition(points, start, end) {
   const mid = start + Math.floor((end - start) / 2);
   const pivotDistance = dist(points[mid]);

   let startDistance = dist(points[start]);

   while (start < end) {
      if (startDistance >= pivotDistance) {
         [points[start], points[end]] = [points[end], points[start]];
         end--;
      } else {
         start++;
      }
      startDistance = dist(points[start]);
   }

   if (startDistance <= pivotDistance) {
      start++;
   }

   return start;
}

function dist([x, y]) {
   return x ** 2 + y ** 2;
}

//
// TEST
//
console.log(
   solve(
      [
         [3, 3],
         [5, -1],
         [-2, 4],
      ],
      2
   )
);
