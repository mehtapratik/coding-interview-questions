//
// INSTRUCTIONS
//

//
// EXAMPLE
//

//
// EXPLANATION
//
// positive values only?
// zero value considered?
// non numeric value possibility?
//
// [] = 0
// [1, 1, 1, 1, 1]
// [1, 2, 3, 4, 5]
// [5, 4, 3, 2, 1]
// *
// 2, 5, 1, 3, 6
//
// Maximum money received from these two options
// option 1: give up money and go to next house (+1)
// option 2: take money and skip a house (+2)
//

//
// CODE
//
function houseThief(houses) {
   if (Array.isArray(houses) === false || houses.length === 0) {
      return 0;
   }

   const cache = {};
   // return dfs(0);
   // return memoization(0);
   // return tabulation();
   return tabulation1S();

   // O(2^n)T | O(n)S
   function dfs(index) {
      if (index >= houses.length) {
         return 0;
      }

      return Math.max(dfs(index + 1), dfs(index + 2) + houses[index]);
   }

   // O(n)TS
   function memoization(index) {
      if (index in cache) {
         return cache[index];
      }

      if (index >= houses.length) {
         return 0;
      }

      cache[index] = Math.max(
         memoization(index + 1),
         memoization(index + 2) + houses[index]
      );

      return cache[index];
   }

   // O(n)TS
   function tabulation() {
      const table = Array(houses.length + 1).fill(0);
      // initialize first houses profit
      table[1] = houses[0];
      for (let i = 1; i < houses.length; i++) {
         table[i + 1] = Math.max(table[i], table[i - 1] + houses[i]);
      }

      return table[houses.length];
   }

   // O(n)T | O(1)S
   function tabulation1S() {
      let previous = 0;
      let current = houses[0];
      for (let i = 1; i < houses.length; i++) {
         const next = Math.max(current, previous + houses[i]);
         previous = current;
         current = next;
      }

      return current;
   }
}

//
// TEST
//
console.log(houseThief([2, 5, 3, 6]));
console.log(houseThief([2, 5, 1, 3, 6, 2, 4]));
console.log(houseThief([2, 10, 14, 8, 1]));
console.log(houseThief([]));
console.log(houseThief([1, 1, 1, 1, 1]));
console.log(houseThief([1, 2, 3, 4, 5]));
console.log(houseThief([5, 4, 3, 2, 1]));
