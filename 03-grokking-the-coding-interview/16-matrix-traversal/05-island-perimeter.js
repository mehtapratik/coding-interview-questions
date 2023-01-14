//
// INSTRUCTIONS
//
// You are given a 2D matrix containing only 1s (land) and 0s (water).
//
// An island is a connected set of 1s (land) and is surrounded by either
// an edge or 0s(water). Each cell is considered connected to other cells
// horizontally or vertically(not diagonally).

// There are no lakes on the island, so the water inside the island is
// not connected to the water around it.A cell is a square with a side
// length of 1.

// The given matrix has only one island, write a function to find the
// perimeter of that island.
//

//
// EXAMPLE
//
//input ->     [1, 1, 0, 0, 0]
//             [0, 1, 0, 0, 0]
//             [0, 1, 0, 0, 0]
//             [0, 1, 1, 0, 0]
//             [0, 0, 0, 0, 0]
//
// output ->   14
// explanation -> The boundary of the island has 14 sides
//              _ _
//             |1 1|
//              -|1|
//               |1|_
//               |1 1|
//                - -
//

//
// CODE
//
// O(r * c)T
// O(r * c)S -    If used DFS approach, recursive calls can take r * c space in call stack for worst
//                case when an entire matrix is filled with 1s.
// O(min(r, c)) - If used BFS approach, queue may need maximum space of min(r, c) space when an
//                entire matrix is filled with 1s.
function islandPerimeter(matrix) {
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

   let perimeter = 0;
   for (let x = 0; x < ROW_COUNT; x++) {
      for (let y = 0; y < COL_COUNT; y++) {
         if (matrix[x][y] === 1) {
            perimeter += getIslandPerimeterBFS(x, y);
            // perimeter += getIslandPerimeterDFS(x, y);
         }
      }
   }

   return perimeter;

   function getIslandPerimeterDFS(x, y) {
      if (x < 0 || y < 0 || x >= ROW_COUNT || y >= COL_COUNT) {
         return 1;
      }
      if (matrix[x][y] === 0) {
         return 1;
      }
      if (matrix[x][y] === -1) {
         return 0;
      }

      // mark node as visited with some other value than 0 since anything connected with 0
      // will be considered as an edge by recursive calls
      matrix[x][y] = -1;

      let perimeter = 0;
      perimeter += getIslandPerimeterDFS(x - 1, y);
      perimeter += getIslandPerimeterDFS(x + 1, y);
      perimeter += getIslandPerimeterDFS(x, y - 1);
      perimeter += getIslandPerimeterDFS(x, y + 1);

      return perimeter;
   }

   function getIslandPerimeterBFS(originX, originY) {
      const queue = [[originX, originY]];
      let perimeter = 0;
      while (queue.length > 0) {
         const [x, y] = queue.shift();

         // mark node as visited with some other value than 0 since anything connected with 0
         // will be considered as an edge by neighbor nodes
         matrix[x][y] = -1;

         // check all four sides for edges. wherever we have
         // an edge (either water or end of matrix), we add 1
         // to the perimeter measurement.
         perimeter += enqueueAndMeasure(x - 1, y, queue);
         perimeter += enqueueAndMeasure(x + 1, y, queue);
         perimeter += enqueueAndMeasure(x, y - 1, queue);
         perimeter += enqueueAndMeasure(x, y + 1, queue);
      }
      return perimeter;
   }

   function enqueueAndMeasure(x, y, queue) {
      // we're at the edge of the matrix - count 1 for this particular edge
      // and exit since we can't add any more nodes
      if (x < 0 || y < 0 || x >= ROW_COUNT || y >= COL_COUNT) {
         return 1;
      }
      if (matrix[x][y] === 1) {
         queue.push([x, y]);

         // we're at the cell where land meets land - no edge to be counted
         return 0;
      } else {
         // if current edge is connected with water (0s), send 1 to count it as perimeter.
         // if current edge is connected with already visited node (-1), send 0 to not not count as perimeter.
         return matrix[x][y] === 0 ? 1 : 0;
      }
   }
}

//
// TEST
//
console.log(
   islandPerimeter([
      [1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
   ])
);

console.log(
   islandPerimeter([
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
   ])
);
