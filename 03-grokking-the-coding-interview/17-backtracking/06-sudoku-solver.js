//
// INSTRUCTIONS
//
// Write a program to solve a Sudoku puzzle by filling the empty cells.
//
// A sudoku solution must satisfy all of the following rules:
//
// Each of the digits 1-9 must occur exactly once in each row.
// Each of the digits 1-9 must occur exactly once in each column.
// Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
// The '.' character indicates empty cells.
//

//
// EXAMPLE
//
// Input
//             {'5', '3', '.', '.', '7', '.', '.', '.', '.'},
//             {'6', '.', '.', '1', '9', '5', '.', '.', '.'},
//             {'.', '9', '8', '.', '.', '.', '.', '6', '.'},
//             {'8', '.', '.', '.', '6', '.', '.', '.', '3'},
//             {'4', '.', '.', '8', '.', '3', '.', '.', '1'},
//             {'7', '.', '.', '.', '2', '.', '.', '.', '6'},
//             {'.', '6', '.', '.', '.', '.', '2', '8', '.'},
//             {'.', '.', '.', '4', '1', '9', '.', '.', '5'},
//             {'.', '.', '.', '.', '8', '.', '.', '7', '9'}
//
// Output
//             {'5'', '3'', '4'', '6'', '7'', '8'', '9'', '1'', '2''},
//             {'6'', '7'', '2'', '1'', '9'', '5'', '3'', '4'', '8''},
//             {'1'', '9'', '8'', '3'', '4'', '2'', '5'', '6'', '7''},
//             {'8'', '5'', '9'', '7'', '6'', '1'', '4'', '2'', '3''},
//             {'4'', '2'', '6'', '8'', '5'', '3'', '7'', '9'', '1''},
//             {'7'', '1'', '3'', '9'', '2'', '4'', '8'', '5'', '6''},
//             {'9'', '6'', '1'', '5'', '3'', '7'', '2'', '8'', '4''},
//             {'2'', '8'', '7'', '4'', '1'', '9'', '6'', '3'', '5''},
//             {'3'', '4'', '5'', '2'', '8'', '6'', '1'', '7'', '9''}
//  Explanation: The given output is the only valid Sudoku solution.
//

//
// CODE
//
function solveSudoku(board) {
   for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
         if (board[i][j] === ".") {
            for (let n = 1; n <= 9; n++) {
               if (canPlace(i, j, n.toString())) {
                  board[i][j] = n.toString();
                  if (solveSudoku(board)) {
                     // reaching here means that you were able to place a the number `n`
                     // in `i, j` position in a way that satisfied all Sudoku constraints
                     return board;
                  } else {
                     board[i][j] = ".";
                  }
               }
            }
            // if you reach here, it means that you could not place any number in place of '.'
            // in a way that it satisfies all Sudoku constraints
            return null;
         }
      }
   }

   // reaching here  means that you were able to fill entire board
   return board;

   function canPlace(row, col, number) {
      for (let i = 0; i < 9; i++) {
         if (board[row][i] === number) return false;
         if (board[i][col] === number) return false;
         if (
            board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][
               Math.floor(col / 3) * 3 + (i % 3)
            ] === number
         ) {
            return false;
         }
      }
      return true;
   }
}

//
// TEST
//
// Test case 1
let board = [
   ["5", "3", ".", ".", "7", ".", ".", ".", "."],
   ["6", ".", ".", "1", "9", "5", ".", ".", "."],
   [".", "9", "8", ".", ".", ".", ".", "6", "."],
   ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
   ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
   ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
   [".", "6", ".", ".", ".", ".", "2", "8", "."],
   [".", ".", ".", "4", "1", "9", ".", ".", "5"],
   [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

showMatrix(solveSudoku(board));
// expected output:  5 3 4 6 7 8 9 1 2
//                   6 7 2 1 9 5 3 4 8
//                   1 9 8 3 4 2 5 6 7
//                   8 5 9 7 6 1 4 2 3
//                   4 2 6 8 5 3 7 9 1
//                   7 1 3 9 2 4 8 5 6
//                   9 6 1 5 3 7 2 8 4
//                   2 8 7 4 1 9 6 3 5
//                   3 4 5 2 8 6 1 7 9

// Test case 2
board = [
   ["8", ".", ".", ".", ".", ".", ".", ".", "."],
   [".", ".", "3", "6", ".", ".", ".", ".", "."],
   [".", "7", ".", ".", "9", ".", "2", ".", "."],
   [".", "5", ".", ".", ".", "7", ".", ".", "."],
   [".", ".", ".", ".", "4", "5", "7", ".", "."],
   [".", ".", ".", "1", ".", ".", ".", "3", "."],
   [".", ".", "1", ".", ".", ".", ".", "6", "8"],
   [".", ".", "8", "5", ".", ".", ".", "1", "."],
   [".", "9", ".", ".", ".", ".", "4", ".", "."],
];
showMatrix(solveSudoku(board));
// expected output:  8 1 2 7 5 3 6 4 9
//                   9 4 3 6 8 2 1 7 5
//                   6 7 5 4 9 1 2 8 3
//                   1 5 4 2 3 7 8 9 6
//                   3 6 9 8 4 5 7 2 1
//                   2 8 7 1 6 9 5 3 4
//                   5 2 1 9 7 4 3 6 8
//                   4 3 8 5 2 6 9 1 7
//                   7 9 6 3 1 8 4 5 2

//
// COMPLEXITY ANALYSIS
//
// O(1)TS
//
// Since the board size is fixed, the time complexity is O(1), as there is no variable input.
//
// Though let's discuss the number of operations needed: O(9!)^9
//
// Let's consider one row where we have 9 cells to fill. There are not more than 9 possibilities
// for the first number to put, not more than 9×8 for the second one, not more than 9×8×7 for
// the third one, and so on. In total, that results in not more than 9! possibilities for just
// one row; this means not more than 9!^9 operations in total.
//
// The board size is fixed, and the space is used to store the board containing 81
// cells, hence the time complexity is O(1)
//
