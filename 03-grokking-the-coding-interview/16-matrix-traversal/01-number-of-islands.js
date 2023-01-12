//
// INSTRUCTIONS
//
// Given a 2D array (i.e., a matrix) containing only 1s (land) and 0s (water), count
// the number of islands in it.
//
// An island is a connected set of 1s (land) and is surrounded by either an edge or
// 0s(water). Each cell is considered connected to other cells horizontally or
// vertically(not diagonally).
// Therefore, the martrix...
// 1 1 0
// 0 1 0
// has one continious island since 1s can be connected by moving horizontally and vertically.
// However, the matrix...
// 1 0 0
// 0 1 1
// has 2 separate islands since 1 on the first row is not connected horizintally or vertically
// with 1s on the second row (diagonal does not count).
//

//
// EXAMPLE
//
// input: [
//          [0, 1, 1, 1, 0],
//          [0, 0, 0, 1, 1],
//          [0, 1, 1, 1, 0],
//          [0, 1, 1, 0, 0],
//          [0, 0, 0, 0, 0],
//        ]
// output: 1
// explanation: there is only one continious island. If we remove all zeros, it is evident:
//        [
//          [   1, 1, 1,  ],
//          [         1, 1],
//          [   1, 1, 1,  ],
//          [   1, 1,     ],
//          [             ],
//        ]
//
// input: [
//          [1, 1, 1, 0, 0],
//          [0, 1, 0, 0, 1],
//          [0, 0, 1, 1, 0],
//          [0, 0, 1, 0, 0],
//          [0, 0, 1, 0, 0],
//        ]
// output: 3
// explanation: we notice three isolated islands.
//        [
//          [1, 1, 1,     ],
//          [   1,       1],
//          [      1, 1,  ],
//          [      1      ],
//          [      1      ],
//        ]
//

//
// CODE
//
// O(r * c)T - for DFS and BFS
// Time complexity for both approches, DFS and BFS, is O(r*c) since we're going through each row and cell.
// O(r * c)S - for DFS
// Space complexity for DFS is O(r*c) due two call stack that we're using for DFS recursion and
// also for the `travelLog` that we're maintaining. In worst case, entire matrix is filled with
// land (1s) in that case `travelLog` and recursion call stack will be 2(r*c). Dropping the constant
// spacing complexity will be O(r*c).
//
// O(min(r, c))S - if we're allowed to mutate the matrix in BFS
// O(r * c)S - if we're not allowed to mutate the matrix in BFS
// Space complexity for BFS would depend on whether we're allowed to mutate the matrix or not. If we're
// allowed to mutate the matrix, space required to create the queue will only be considered which is
// min(r, c). In worst case when entire matrix is filled with land (1s) queue will get as big as minimum
// of row or column counts. However, if we're not allowed to mutate the array, we will need r * c space
// in worst case to maintain separate copy of of places we visited (travelLog). Plus, we will also maintain
// queue for BFS search which is min(r, c). So the actual space complexity wil lead to O((r * c) + min(r, c)).
// Simplifying it further, it results to O(r * c).
//
function numberOfIslands(matrix) {
   // filter out invalid matrix
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

   // hash map to track visited land nodes (1s)
   const travelLog = {};
   let islandCount = 0;
   for (let i = 0; i < ROW_COUNT; i++) {
      for (let j = 0; j < COL_COUNT; j++) {
         if (matrix[i][j] === 1 && !travelLog[coord(i, j)]) {
            // we came across a land node that is not yet visited.
            // increase island count by one
            islandCount += 1;

            // if we're allowed to mutate the matrix, mark current land cell as water to avoid
            // being counted as land again
            // matrix[row][col] = 0;

            // if we're not allowed to mutate the matrix, we will use separate hash to track
            // visited cells
            travelLog[coord(i, j)] = true;

            // mark all neighboring cells as visited to avoid them being counted as island
            // visitPlaceDFS(i, j);
            visitPlaceBFS(i, j);
         }
      }
   }

   return islandCount;

   function visitPlaceDFS(x, y) {
      // if neighboring cells are non-visited land cells, mark them visited and recursively update its neighbors
      if (isUnseenLandNode(x - 1, y)) {
         // matrix[x - 1][y] = 0;
         travelLog[coord(x - 1, y)] = true;
         visitPlaceDFS(x - 1, y);
      }
      if (isUnseenLandNode(x + 1, y)) {
         // matrix[x + 1][y] = 0;
         travelLog[coord(x + 1, y)] = true;
         visitPlaceDFS(x + 1, y);
      }
      if (isUnseenLandNode(x, y - 1)) {
         // matrix[x][y - 1] = 0;
         travelLog[coord(x, y - 1)] = true;
         visitPlaceDFS(x, y - 1);
      }
      if (isUnseenLandNode(x, y + 1)) {
         // matrix[x][y + 1] = 0;
         travelLog[coord(x, y + 1)] = true;
         visitPlaceDFS(x, y + 1);
      }
   }

   function visitPlaceBFS(x, y) {
      const nodes = [[x, y]];
      while (nodes.length > 0) {
         const [row, col] = nodes.shift();

         // if neighboring cells are valid land cells, add them to queue and mark them visited
         isUnseenLandNode(row - 1, col) && visitNode(row - 1, col, nodes);
         isUnseenLandNode(row + 1, col) && visitNode(row + 1, col, nodes);
         isUnseenLandNode(row, col - 1) && visitNode(row, col - 1, nodes);
         isUnseenLandNode(row, col + 1) && visitNode(row, col + 1, nodes);
      }
   }

   function isUnseenLandNode(a, b) {
      if (a < 0 || b < 0 || a >= ROW_COUNT || b >= COL_COUNT) {
         return false;
      }
      return matrix[a][b] === 1 && !(coord(a, b) in travelLog);
   }

   function visitNode(a, b, nodes) {
      // matrix[row][col] = 0;
      travelLog[coord(a, b)] = true;

      nodes.push([a, b]);
   }

   function coord(row, col) {
      return `${row}, ${col}`;
   }
}

//
// TEST
//
console.log(
   numberOfIslands([
      [1, 1, 1, 0, 0],
      [0, 1, 0, 0, 1],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
   ])
);

console.log(
   numberOfIslands([
      [0, 1, 1, 1, 0],
      [0, 0, 0, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
   ])
);

console.log(
   numberOfIslands([
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
   ])
);
