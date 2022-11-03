//
// INSTRUCTIONS
//
// Given an m x n grid of characters board and a string word, return true if word exists in the grid.
//
// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are
// horizontally or vertically neighboring.The same letter cell may not be used more than once.
//

//
// EXAMPLE
//
// Input: (board = [
//    ["A", "B", "C", "E"],
//    ["S", "F", "C", "S"],
//    ["A", "D", "E", "E"],
// ]),
//    (word = "ABCCED");
// Output: true;
//
//
// Input: (board = [
//    ["A", "B", "C", "E"],
//    ["S", "F", "C", "S"],
//    ["A", "D", "E", "E"],
// ]),
//    (word = "ABCB");
// Output: false;
//

//
// CODE
//
function wordSearch(board, word) {
   const ROW_COUNT = board.length;
   const COL_COUNT = board[0].length;
   const pathMap = new Set();

   // Number of cells in board are less than total number of characters in word
   if (word.length > ROW_COUNT * COL_COUNT) {
      return false;
   }

   for (let rowIdx = 0; rowIdx < ROW_COUNT; rowIdx++) {
      for (let colIdx = 0; colIdx < COL_COUNT; colIdx++) {
         if (dfsBacktrack(rowIdx, colIdx, 0)) {
            return true;
         }
      }
   }

   return false;

   function dfsBacktrack(rowIdx, colIdx, wordIdx) {
      // we reached end of the word and it means that
      // we found every character of given word in the board
      if (wordIdx >= word.length) {
         return true;
      }

      // Invalid parameter values
      if (
         rowIdx < 0 || // out of bound
         colIdx < 0 || // out of bound
         rowIdx >= ROW_COUNT || // out of bound
         colIdx >= COL_COUNT || // out of bound
         board[rowIdx][colIdx] !== word[wordIdx] || // did not find given characters at currect board position
         pathMap.has(`${rowIdx}, ${colIdx}`) // current board position is already been visiting earlier
      ) {
         return false;
      }

      // Current board position matches given character,
      // add cell coordinates to path map
      //
      // We could update the board coordinate itself with "null" value
      // to avoid using extra space
      pathMap.add(`${rowIdx}, ${colIdx}`);

      // Look for next character in surrounding four directions
      const response =
         dfsBacktrack(rowIdx, colIdx + 1, wordIdx + 1) ||
         dfsBacktrack(rowIdx, colIdx - 1, wordIdx + 1) ||
         dfsBacktrack(rowIdx + 1, colIdx, wordIdx + 1) ||
         dfsBacktrack(rowIdx - 1, colIdx, wordIdx + 1);

      // Backtrack. Remove current board position from path map
      pathMap.delete(`${rowIdx}, ${colIdx}`);

      return response;
   }
}

//
// TEST
//
console.log(
   wordSearch(
      [
         ["A", "P", "R", "E"],
         ["S", "K", "A", "S"],
         ["A", "I", "T", "E"],
      ],
      "PRA"
   )
);

//
// COMPLEXITY ANALYSIS
//
// O(r * c * 4^n)T / O(n)S
// Where R is number of rows and C is number of cols in board.Whereas, N is number of characters in word.
// 4^n because we're searching in all four directions of board for each word N time
//
// O(n)S - because both, pathMap and dfsBacktrack callstack will not be greater than length of the word.
// Although, we're looking in all four directions of board, short-circuiting feature of JS will only look
// for one direction at a time not exceeding call stack length greater than O(n+1)S which asyptotically is
// same as O(n)S.
//
