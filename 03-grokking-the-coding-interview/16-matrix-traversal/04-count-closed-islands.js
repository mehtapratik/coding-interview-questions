//
// INSTRUCTIONS
//
// You are given a 2D matrix containing only 1s (land) and 0s (water).
//
// An island is a connected set of 1s (land) and is surrounded by
// either an edge or 0s(water).Each cell is considered connected to
// other cells horizontally or vertically(not diagonally).
//
// A closed island is an island that is totally surrounded by 0s
// (i.e., water). This means all horizontally and vertically connected
// cells of a closed island are water.This also means that, by definition,
// a closed island can't touch an edge (as then the edge cells are not
// connected to any water cell).
//
// Write a function to find the number of closed islands in the given matrix.
//

//
// EXAMPLE
//
// input -> [ [1, 1, 0, 0, 0],
//            [0, 1, 0, 0, 0],
//            [0, 0, 1, 1, 0],
//            [0, 1, 1, 0, 0],
//            [0, 0, 0, 0, 0]
//          ]
// output -> 1
// Explanation -> The given matrix has two islands, but only the highlighted island is a
// closed island.The other island is touching the boundary that's why is is not considered a
// closed island.
//          [ [             ],
//            [             ],
//            [      1, 1   ],
//            [   1, 1      ],
//            [             ]
//          ]
//

//
// CODE
//
// O(r * c)T -> Both, DFS and BFS approches
// O(r * c)S -> Both, DFS and BFS approaches to maintain travel log needed track visited land nodes
//              In worst case, travelLog will the size of matrix (minus 2 rows and 2 cols) if entire
//              matrix is filled with land nodes
function countClosedIslands(matrix) {
   if (
      Array.isArray(matrix) === false ||
      Array.isArray(matrix[0]) === false ||
      matrix.length < 3 ||
      matrix[0].length < 3
   ) {
      return false;
   }

   const ROW_COUNT = matrix.length;
   const COL_COUNT = matrix[0].length;
   const travelLog = {};

   let islandCount = 0;

   for (let x = 1; x < ROW_COUNT - 1; x++) {
      for (let y = 1; y < COL_COUNT - 1; y++) {
         if (isUnseenLand(x, y)) {
            if (isIslandBFS(x, y)) {
               islandCount += 1;
            }
            // if (isIslandDFS(x, y)) {
            //    islandCount += 1;
            // }
         }
      }
   }

   return islandCount;

   function isIslandBFS(originX, originY) {
      const queue = [[originX, originY]];
      while (queue.length > 0) {
         const [x, y] = queue.shift();
         if (isOnEdge(x, y)) return false;
         travelLog[coords(x, y)] = true;

         queueIfLandNode(x - 1, y, queue);
         queueIfLandNode(x + 1, y, queue);
         queueIfLandNode(x, y - 1, queue);
         queueIfLandNode(x, y + 1, queue);
      }
      return true;
   }

   function isIslandDFS(x, y) {
      if (x < 0 || y < 0 || x >= ROW_COUNT || y >= COL_COUNT) return false;
      if (matrix[x][y] === 0 || coords(x, y) in travelLog) return true;

      travelLog[coords(x, y)] = true;
      return (
         isIslandDFS(x - 1, y) &&
         isIslandDFS(x + 1, y) &&
         isIslandDFS(x, y - 1) &&
         isIslandDFS(x, y + 1)
      );
   }

   function queueIfLandNode(x, y, queue) {
      if (isUnseenLand(x, y)) {
         queue.push([x, y]);
      }
   }

   function isOnEdge(x, y) {
      return x === 0 || y === 0 || x >= ROW_COUNT - 1 || y >= COL_COUNT - 1;
   }

   function isUnseenLand(x, y) {
      if (x < 0 || y < 0 || x >= ROW_COUNT || y >= COL_COUNT) {
         return false;
      }
      return matrix[x][y] === 1 && not(coords(x, y) in travelLog);
   }

   function not(bool) {
      return bool == true ? false : true;
   }

   function coords(x, y) {
      return `${x},${y}`;
   }
}

//
// TEST
//
console.log(
   countClosedIslands([
      [1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
   ])
);

console.log(
   countClosedIslands([
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
   ])
);
