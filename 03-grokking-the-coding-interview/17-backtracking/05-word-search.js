//
// INSTRUCTIONS
//
// Given an m x n grid of characters board and a string word, return true if
// the word exists in the grid.
//
// The word can be constructed from letters of sequentially adjacent cells,
// where adjacent cells are horizontally or vertically neighboring.The same
// letter cell may not be used more than once.
//

//
// EXAMPLE
//
// Input: word="ABCCED", board:
//
//     { 'A', 'B', 'C', 'E' },
//     { 'S', 'F', 'C', 'S' },
//     { 'A', 'D', 'E', 'E' }
// Output: true Explanation: The word exists in the board:
//     { 'A', 'B', 'C', '_' },
//     { '_', '_', 'C', '_' },
//     { '_', 'D', 'E', '_' }
//
// Example 2:
// Input: word="SEE", board:
//     { 'A', 'B', 'C', 'E' },
//     { 'S', 'F', 'C', 'S' },
//     { 'A', 'D', 'E', 'E' }
// Output: true Explanation: The word exists in the board:
// -> { '_', '_', '_', '_' },
// -> { '_', '_', '_', 'S' },
// -> { '_', '_', 'E', 'E' }
//

//
// CODE
//
function wordSearch(board, word) {
   if (
      Array.isArray(board) === false ||
      Array.isArray(board[0]) === false ||
      typeof word !== "string"
   ) {
      return false;
   }
   if (word.length === 0) {
      return true;
   }
   const ROW_COUNT = board.length;
   const COL_COUNT = board[0].length;
   const WORD_LEN = word.length;

   for (let i = 0; i < ROW_COUNT; i++) {
      for (let j = 0; j < COL_COUNT; j++) {
         if (dfs(i, j, 0)) {
            return true;
         }
      }
   }

   return false;

   function dfs(rowIdx, colIdx, wordIdx) {
      // matched every character of the word and thus, reached the end of the word
      if (wordIdx >= WORD_LEN) {
         return true;
      }

      // either row, col or both indicies outside the boundary of the board
      if (
         rowIdx < 0 ||
         rowIdx >= ROW_COUNT ||
         colIdx < 0 ||
         colIdx >= COL_COUNT
      ) {
         return false;
      }

      // boad character and word character at given positions don't match
      if (
         typeof board[rowIdx][colIdx] !== "string" ||
         board[rowIdx][colIdx].toLowerCase() !== word[wordIdx].toLowerCase()
      ) {
         return false;
      }

      let found = false;

      board[rowIdx][colIdx] = null;
      found = searchSurroundings(rowIdx, colIdx, wordIdx + 1);
      board[rowIdx][colIdx] = word[wordIdx];

      return found;

      function searchSurroundings(rowIdx, colIdx, wordIdx) {
         const surroundings = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
         ];
         for (let coord of surroundings) {
            const [rowOffset, colOffset] = coord;
            if (dfs(rowIdx + rowOffset, colIdx + colOffset, wordIdx)) {
               return true;
            }
         }

         return false;
      }
   }
}

//
// TEST
//
console.log(
   wordSearch(
      [
         ["A", "B", "C", "E"],
         ["S", "F", "C", "S"],
         ["A", "D", "E", "E"],
      ],
      "SEE"
   )
); // expected output: true

console.log(
   wordSearch(
      [
         ["A", "B", "C", "E"],
         ["S", "F", "C", "S"],
         ["A", "D", "E", "E"],
      ],
      "X"
   )
); // expected output: true

//
// COMPLEXITY ANALYSIS
//
// O(N x 3^L)T where N is the number of cells in the board and L is the length of the word to be matched.
//
// For the backtracking function, initially we could have at most 4 directions to explore, but
// further the choices are reduced into 3 (since we won't go back to where we come from).
// As a result, the execution trace after the first step could be visualized as a 3-ary tree,
// each of the branches represent a potential exploration in the corresponding direction.
// Therefore, in the worst case, the total number of invocation would be the number of nodes
// in a full 3-nary tree, which is about 3^L.
//
// We iterate through the board for backtracking, i.e.there could be N times invocation for
// the backtracking function in the worst case.
//
// As a result, overall the time complexity of the algorithm would be O(N x 3^L).
//
// O(L)S where L is the length of the word to be matched.
//
// The main consumption of the memory lies in the recursion call of the backtracking function.
// The maximum length of the call stack would be the length of the word. Therefore, the space
// complexity of the algorithm is O(L).
//
