//
// INSTRUCTIONS
//
// Any image can be represented by a 2D integer array (i.e., a matrix) where each cell
// represents the pixel value of the image.
//
// Flood fill algorithm takes a starting cell (i.e., a pixel) and a color. The given
// color is applied to all horizontally and vertically connected cells with the same
// color as that of the starting cell. Recursively, the algorithm fills cells with the
// new color until it encounters a cell with a different color than the starting cell.
//
// Given a matrix, a starting cell, and a color, flood fill the matrix.
//

//
// EXAMPLE
//
// matrix -> [
//             [0, 1, 1, 1, 0],
//             [0, 0, 0, 1, 1],
//             [0, 1, 0, 1, 0],
//             [0, 1, 1, 0, 0],
//             [0, 0, 0, 0, 0],
//          ],
// start location -> [1, 3],
// new color -> 5;
// output -> [
//             [0, 5, 5, 5, 0],
//             [0, 0, 0, 5, 5],
//             [0, 1, 0, 5, 0],
//             [0, 1, 1, 0, 0],
//             [0, 0, 0, 0, 0],
//           ]
//

//
// CODE
//
function floodFill(matrix, location, newValue) {
   if (
      Array.isArray(matrix) === false ||
      Array.isArray(matrix[0]) === false ||
      Array.isArray(location) === false ||
      location.length !== 2
   ) {
      return false;
   }
   const [originX, originY] = location;
   const ROW_COUNT = matrix.length;
   const COL_COUNT = matrix[0].length;
   const oldValue = matrix[originX][originY];

   // return dfs(originX, originY, oldValue, newValue);
   return bfs(originX, originY, oldValue, newValue);

   // O(r * c)TS
   function dfs(x, y, oldValue, newValue) {
      editCellIfValid(x, y, oldValue, newValue);

      editCellIfValid(x - 1, y, oldValue, newValue) &&
         dfs(x - 1, y, oldValue, newValue);
      editCellIfValid(x + 1, y, oldValue, newValue) &&
         dfs(x + 1, y, oldValue, newValue, newValue);
      editCellIfValid(x, y - 1, oldValue, newValue) &&
         dfs(x, y - 1, oldValue, newValue, newValue);
      editCellIfValid(x, y + 1, oldValue, newValue) &&
         dfs(x, y + 1, oldValue, newValue);

      return matrix;
   }

   // O(r * c)T | O(min(r, c))S
   function bfs(originX, originY, oldValue, newValue) {
      const queue = [[originX, originY]];
      while (queue.length) {
         const [x, y] = queue.shift();
         editCellIfValid(x, y, oldValue, newValue);

         editCellIfValid(x - 1, y, oldValue, newValue) &&
            queue.push([x - 1, y]);
         editCellIfValid(x + 1, y, oldValue, newValue) &&
            queue.push([x + 1, y]);
         editCellIfValid(x, y - 1, oldValue, newValue) &&
            queue.push([x, y - 1]);
         editCellIfValid(x, y + 1, oldValue, newValue) &&
            queue.push([x, y + 1]);
      }

      return matrix;
   }

   function editCellIfValid(x, y, oldValue, newValue) {
      if (x < 0 || y < 0 || x >= ROW_COUNT || y >= COL_COUNT) {
         return false;
      }
      if (matrix[x][y] === oldValue) {
         matrix[x][y] = newValue;
         return true;
      }

      return false;
   }
   return matrix;
}

//
// TEST
//
showMatrix(
   floodFill(
      [
         [0, 1, 1, 1, 0],
         [0, 0, 0, 1, 1],
         [0, 1, 1, 1, 0],
         [0, 1, 1, 0, 0],
         [0, 0, 0, 0, 0],
      ],
      [1, 3],
      5
   )
);

showMatrix(
   floodFill(
      [
         [0, 0, 1, 1, 1],
         [0, 0, 0, 0, 1],
         [0, 1, 1, 1, 0],
         [1, 1, 1, 0, 0],
         [0, 0, 0, 0, 0],
      ],
      [0, 2],
      5
   )
);

showMatrix(
   floodFill(
      [
         [1, 0, 1, 0, 1],
         [0, 1, 0, 1, 0],
         [1, 0, 1, 0, 1],
      ],
      [0, 2],
      5
   )
);

showMatrix(
   floodFill(
      [
         [1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1],
      ],
      [0, 2],
      5
   )
);
