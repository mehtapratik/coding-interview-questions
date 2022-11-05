//
// INSTRUCTIONS
//
// Given an array of points in a 2D plane, find ‘K’ closest points to the origin.
//

//
// EXAMPLE
//
// Example 1:

// Input: points = [[1,2],[1,3]], K = 1
// Output: [[1,2]]
// Explanation: The Euclidean distance between (1, 2) and the origin (0, 0) is sqrt(5).
// The Euclidean distance between (1, 3) and the origin (0, 0) is sqrt(10).
// Since sqrt(5) < sqrt(10), therefore (1, 2) is closer to the origin.
// Explanation for Euclidean Distance: https://byjus.com/maths/euclidean-distance/
// Euclidean Distance: SQRT((x2 - x1)^2 + (y2 - y1)^2)
//
// Example 2:
// Input: point = [[1, 3], [3, 4], [2, -1]], K = 2
// Output: [[1, 3], [2, -1]]
//

//
// PREPARATION
//
class Point {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.distanceFromOrigin = null;
   }

   getDistanceFromOrigin() {
      return Math.sqrt(this.x * this.x + this.y * this.y).toFixed(2);
   }

   get_point() {
      return "[" + this.x + ", " + this.y + "] ";
   }
}

//
// CODE
//
const find_closest_points = function (points, k) {
   const maxHeap = new Heap(
      [],
      null,
      (a, b) => a.getDistanceFromOrigin() - b.getDistanceFromOrigin()
   );
   for (let point of points) {
      if (maxHeap.length < k) {
         maxHeap.push(point);
         continue;
      }
      if (
         maxHeap.peek().getDistanceFromOrigin() > point.getDistanceFromOrigin()
      ) {
         maxHeap.pop();
         maxHeap.push(point);
      }
   }
   return maxHeap.toArray();
};

//
// TEST
//
const points = find_closest_points(
   [new Point(1, 3), new Point(3, 4), new Point(2, -1)],
   1
);
let result = "Here are the k points closest the origin: ";
for (i = 0; i < points.length; i++) result += points[i].get_point();
console.log(result);

//
// COMPLEXITY ANALYSIS
//
// The time complexity of this algorithm is O(N * logK) as we iterating all points and
// pushing them into the heap.
//
// The space complexity will be O(K) because we need to store ‘K’ point in the heap.
//
