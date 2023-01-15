//
// INSTRUCTIONS
//
// You are given a 2D matrix containing only 1s (land) and 0s (water).
//
// An island is a connected set of 1s (land) and is surrounded by either an
// edge or 0s(water). Each cell is considered connected to other cells horizontally
// or vertically(not diagonally).
//
// Two islands are considered the same if and only if they can be translated
// (not rotated or reflected) to equal each other.
//
// Write a function to find the number of distinct islands in the given matrix.
//

//
// EXAMPLE
//
// input                output
// -------              --------
// 1 1 0 1 1            3
// 1 1 0 0 1
// 0 0 0 0 0
// 0 1 1 0 1
// 0 1 1 0 1
//
// explanation: there are three unique shapes of islands
// 1 1   1 1
// 1 1     1
//
//   1 1   1
//   1 1   1
//

//
// CODE
//
function noOfDistinctIslands(matrix) {
   if (Array.isArray(matrix) === false || Array.isArray(matrix[0]) === false) {
      return -1;
   }

   const ROW_COUNT = matrix.length;
   const COL_COUNT = matrix[0].length;
   const travelLog = {};
   const islandShapes = new Set();

   // helper method to visualize how matrix looks
   showMatrix(matrix);

   for (let x = 0; x < ROW_COUNT; x++) {
      for (let y = 0; y < COL_COUNT; y++) {
         if (matrix[x][y] === 1 && not(coord(x, y) in travelLog)) {
            // if we're here that means we found a land node that has
            // not yet been visited, i.e. we found a new island. mark this
            // as origin (o) direction and identify its shape either by
            // BFS or DFS search
            // distinctIslands.add(visitIslandBFS(x, y, "o"));
            islandShapes.add(visitIslandDFS(x, y, "o").join(""));
         }
      }
   }

   // set will only store unique island shapes. therefore, return langth of island shapes
   return islandShapes.length;

   function visitIslandDFS(x, y, direction, shape = []) {
      if (x < 0 || y < 0 || x >= ROW_COUNT || y >= COL_COUNT) {
         // we've arried at the edge of the matrix. return the shape built so far.
         return shape;
      }
      if (matrix[x][y] === 0) {
         // we've arrived at water node. return the shape build so far.
         return shape;
      }
      if (coord(x, y) in travelLog) {
         // no need to recurse deeper; we've already visited this node.
         return shape;
      }

      travelLog[coord(x, y)] = true; // mark the node as visited
      shape.push(direction);

      // look for land nodes in all four directions
      visitIslandDFS(x - 1, y, "t", shape);
      visitIslandDFS(x + 1, y, "d", shape);
      visitIslandDFS(x, y - 1, "l", shape);
      visitIslandDFS(x, y + 1, "r", shape);

      return shape;
   }

   function visitIslandBFS(originX, originY, originDirection) {
      const queue = [[originX, originY, originDirection]];
      const shape = [];
      while (queue.length) {
         const [x, y, direction] = queue.shift();

         travelLog[coord(x, y)] = true; // mark the node as visited
         shape.push(direction);

         // search in all four directions for non-visited land nodes
         enqueueIfLandNode(x - 1, y, "u", queue);
         enqueueIfLandNode(x + 1, y, "d", queue);
         enqueueIfLandNode(x, y - 1, "l", queue);
         enqueueIfLandNode(x, y + 1, "r", queue);
      }

      return shape.join("");
   }

   function enqueueIfLandNode(x, y, direction, queue) {
      if (x < 0 || y < 0 || x >= ROW_COUNT || y >= COL_COUNT) {
         // cannot queue nodes anymore. we've arried at the edge of the matrix.
         return;
      }
      // queue the node only if current node is non-visited land node
      if (matrix[x][y] === 1 && not(coord(x, y) in travelLog)) {
         queue.push([x, y, direction]);
      }
   }

   function not(bool) {
      return bool ? false : true;
   }

   function coord(x, y) {
      return `${x},${y}`;
   }
}

//
// TEST
//
console.log(
   noOfDistinctIslands([
      [1, 1, 0, 1, 1],
      [1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 1],
      [0, 1, 1, 0, 1],
   ])
);

console.log(
   noOfDistinctIslands([
      [1, 0, 0, 1, 1],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
   ])
);

console.log(
   noOfDistinctIslands([
      [1, 1, 0, 0, 1],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 1, 1, 0, 0],
   ])
);

console.log(
   noOfDistinctIslands([
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
   ])
);

console.log(
   noOfDistinctIslands([
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
   ])
);

console.log(
   noOfDistinctIslands([
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
   ])
);
