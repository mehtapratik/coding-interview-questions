//
// INSTRUCTIONS
//
// Given a 2D array (i.e., a matrix) containing only 1s (land) and 0s (water), find the biggest
// island in it. Write a function to return the area of the biggest island.
//
// An island is a connected set of 1s (land) and is surrounded by either an edge
// or 0s(water). Each cell is considered connected to other cells horizontally
// or vertically(not diagonally).
//

//
// EXAMPLE
//
// input: [
//          [1, 1, 0, 0, 0],
//          [0, 1, 0, 0, 1],
//          [0, 0, 1, 1, 0],
//          [0, 0, 1, 0, 0],
//          [0, 0, 1, 0, 0],
//        ]
// output: 4
// explanation: we notice three isolated islands. biggest one having 4 nodes
//        [
//          [1, 1,        ],
//          [   1,       1],
//          [      1, 1,  ],
//          [      1      ],
//          [      1      ],
//        ]
//

//
// CODE
//
// O(r * c)T
// O(r * c)S - DFS | Actual 2(r*c) -> for recursion stack and if matrix not mutable space required to
//                            maintain `travelLog` hash
// O(r * c)S - BFS | Actual (r*c) + min(r,c) -> To maintain `travelLog` if we are not allowed
//                   to mutate the area
// O(min(r, c))S - BFS | If we are allowed to mutate the matrix the only space required to generate output
//                       will the space required to maintain BFS queue which is min(r, c).
function biggestIsland(matrix) {
   // filter out invalid input
   if (
      Array.isArray(matrix) === false ||
      Array.isArray(matrix[0]) === false ||
      matrix.length === 0 ||
      matrix[0].length === 0
   ) {
      return 0;
   }

   const ROW_COUNT = matrix.length;
   const COL_COUNT = matrix[0].length;

   const travelLog = {};
   let biggestIsland = 0;
   for (let i = 0; i < ROW_COUNT; i++) {
      for (let j = 0; j < COL_COUNT; j++) {
         if (matrix[i][j] === 1 && !travelLog[coord(i, j)]) {
            biggestIsland = Math.max(
               biggestIsland,
               visitIslandAndMeasureArea(i, j)
            );
         }
      }
   }

   return biggestIsland;

   function visitIslandAndMeasureArea(x, y) {
      // return dfs(x, y);
      return bfs();

      function dfs(x, y) {
         let area = 1;

         // matrix[x][y] = 0;
         travelLog[coord(x, y)] = true;

         area += isUnseenLandNode(x - 1, y) ? dfs(x - 1, y) : 0;
         area += isUnseenLandNode(x + 1, y) ? dfs(x + 1, y) : 0;
         area += isUnseenLandNode(x, y - 1) ? dfs(x, y - 1) : 0;
         area += isUnseenLandNode(x, y + 1) ? dfs(x, y + 1) : 0;

         return area;
      }

      function bfs() {
         let area = 0;
         const nodes = [[x, y]];
         while (nodes.length > 0) {
            const [row, col] = nodes.shift();
            area += 1;

            // matrix[row][col] = 0;
            travelLog[coord(row, col)] = true;

            isUnseenLandNode(row - 1, col) &&
               queueAndMarkSeen(row - 1, col, nodes);
            isUnseenLandNode(row + 1, col) &&
               queueAndMarkSeen(row + 1, col, nodes);
            isUnseenLandNode(row, col - 1) &&
               queueAndMarkSeen(row, col - 1, nodes);
            isUnseenLandNode(row, col + 1) &&
               queueAndMarkSeen(row, col + 1, nodes);
         }

         return area;
      }
   }

   function queueAndMarkSeen(x, y, queue) {
      // matrix[x][y] = 0;
      travelLog[coord(x, y)] = true;
      queue.push([x, y]);
   }

   function isUnseenLandNode(x, y) {
      if (x < 0 || x >= ROW_COUNT || y < 0 || y >= COL_COUNT) {
         return false;
      }
      return matrix[x][y] === 1 && !travelLog[coord(x, y)];
   }

   function coord(x, y) {
      return `${x},${y}`;
   }
}

//
// TEST
//
console.log(
   biggestIsland([
      [1, 1, 1, 0, 0],
      [0, 1, 0, 0, 1],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
   ])
);

console.log(
   biggestIsland([
      [0, 0, 1, 1, 1],
      [0, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
   ])
);

console.log(
   biggestIsland([
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
   ])
);
