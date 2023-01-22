//
// INSTRUCTIONS
//
// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that
// no two queens attack each other.

// Given an integer n, return all distinct solutions to the n-queens puzzle.
// You may return the answer in any order.
//

//
// EXAMPLE
//
// Input:               n = 4
// Output:
// [
//    [
//       ["_","Q","_","_"],
//       ["_","_","_","Q"],
//       ["Q","_","_","_"],
//       ["_","_","Q","_"]
//    ],
//    [
//       ["_","Q","_","_"],
//       ["_","_","_","Q"],
//       ["Q","_","_","_"],
//       ["_","_","Q","_"]
//    ]
// ]
//
//
// PREPARATION
//

//
// CODE
//
function nQueens(n) {
   const results = [];
   return backtrack(0, new Set(), new Set(), new Set(), []);

   // O(n!)T | O(n)S
   // Unlike the brute force approach (n^n), we will only place queens on squares that aren't under attack.
   // For the first queen, we have NNN options. For the next queen, we won't attempt to place it in the same
   // column as the first queen, and there must be at least one square attacked diagonally by the first queen
   // as well. Thus, the maximum number of squares we can consider for the second queen is N−2. For the third
   // queen, we won't attempt to place it in 2 columns already occupied by the first 2 queens, and there must be
   // at least two squares attacked diagonally from the first 2 queens. Thus, the maximum number of squares we
   // can consider for the third queen is N−4. This pattern continues, resulting in an approximate time
   // complexity of N!.
   // While it costs O(N2) to build each valid solution, the amount of valid solutions S(N) does not grow
   // nearly as fast as N!, so O(N!+S(N)∗N2) = O(N!).
   //
   // Extra memory used includes the 4 sets used to store board state, placement positions, as well as
   // the recursion call stack. All of this scales linearly with the number of queens. At the deepest level
   // of DFS chain this would equate to 5n (col + slope + antiSlopes + placements + call stack). This is
   // asyptotically equal to o(n). We do not count space required to generate output in space complexity.
   function backtrack(row, cols, slopes, antiSlopes, placements) {
      if (row === n) {
         showMatrix(createBoard(placements));
         results.push(createBoard(placements));
         return results;
      }

      for (let i = 0; i < n; i++) {
         const [col, slope, antiSlope] = [i, row + i, row - i];

         if (cols.has(col) || slopes.has(slope) || antiSlopes.has(antiSlope)) {
            continue;
         }

         placements.push(col);
         cols.add(col);
         slopes.add(slope);
         antiSlopes.add(antiSlope);

         backtrack(row + 1, cols, slopes, antiSlopes, placements);
         placements.pop();
         cols.delete(col);
         slopes.delete(slope);
         antiSlopes.delete(antiSlope);
      }

      return results;
   }

   function createBoard(placements) {
      const board = [];
      for (let placement of placements) {
         const row = Array(n).fill("_");
         row[placement] = "Q";
         board.push(row);
      }

      return board;
   }
}

//
// TEST
//
console.log(nQueens(4));
