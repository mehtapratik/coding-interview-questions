//
// INSTRUCTIONS
//
// Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
//
// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
//
// Note:
// A Sudoku board (partially filled) could be valid but is not necessarily solvable.
// Only the filled cells need to be validated according to the mentioned rules.
//

//
// EXAMPLES
//
// Input: board = [
//    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//    [".", "9", "8", ".", ".", ".", ".", "6", "."],
//    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//    [".", "6", ".", ".", ".", ".", "2", "8", "."],
//    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
// ];
// Output: true;
//
// Input: board = [
//    ["8", "3", ".", ".", "7", ".", ".", ".", "."],
//    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//    [".", "9", "8", ".", ".", ".", ".", "6", "."],
//    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//    [".", "6", ".", ".", ".", ".", "2", "8", "."],
//    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
// ];
// Output: false;
//

//
// CODE
//
function isValidSudoku(board) {
   for (let i = 0; i < 9; i++) {
      let rows = {};
      let cols = {};
      let boxes = {};
      for (let j = 0; j < 9; j++) {
         const row = board[i][j];
         if (row !== ".") {
            if (rows[row]) return false;
            rows[row] = true;
         }

         const col = board[j][i];
         if (col !== ".") {
            if (cols[col]) return false;
            cols[col] = true;
         }

         const boxRowIdx = 3 * Math.floor(i / 3) + Math.floor(j / 3);
         const boxColIdx = 3 * (i % 3) + (j % 3);
         const box = board[boxRowIdx][boxColIdx];
         if (box !== ".") {
            if (boxes[box]) return false;
            boxes[box] = true;
         }
      }
   }

   return true;
}

//
// TEST
//
console.log(
   isValidSudoku([
      ["5", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"],
   ])
);

console.log(
   isValidSudoku([
      ["8", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"],
   ])
);
