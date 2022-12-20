//
// INSTRUCTIONS
//
// Write a function to calculate the nth Fibonacci number.
//
// Fibonacci numbers are a series of numbers in which each number is the sum of the two preceding numbers.
// First few Fibonacci numbers are: 0, 1, 1, 2, 3, 5, 8, ...
//
// Mathematically we can define the Fibonacci numbers as:
//
//     Fib(n) = Fib(n-1) + Fib(n-2), for n > 1
//
//     Given that: Fib(0) = 0, and Fib(1) = 1
//

//
// CODE
//
const table = { 0: 0, 1: 1 };
const cache = { 0: 0, 1: 1 };
function fib(n) {
   return tabulation();

   // O(2^n)T | O(n)S
   // This solution will take loooong time to return if n is even a little high number e.g. 32
   function recursive() {
      if (n < 2) {
         return n;
      }
      return fib(n - 1) + fib(n - 2);
   }

   // O(n)TS
   function memoization() {
      // note that cache is stored in global score to reuse the calculations in future function calls
      if (n in cache) {
         return cache[n];
      }

      return fib(n - 1) + fib(n - 2);
   }

   // O(n)TS
   function tabulation() {
      // note that table is stored in global score to reuse the calculations in future function calls
      if (n in table) {
         return table[n];
      }

      // `Object.keys(table).length` helps resume calculating from the point table's last fib value
      // this will eliminate calculating same values again. e.g. if table already has 0-100 fibs calculated,
      // and if you want fib(105), you only want to calculate fibs from 101-105.
      for (let i = Object.keys(table).length; i <= n; i++) {
         table[i] = table[i - 1] + table[i - 2];
      }
      return table[n];
   }

   //O(n)T | O(1)S
   function tabulation1S() {
      if (n < 2) {
         return n;
      }

      let prev = 0;
      let current = 1;
      let temp = null;
      for (let i = 2; i <= n; i++) {
         temp = prev;
         prev = current;
         current = temp + prev;
      }

      return current;
   }
}

//
// TEST
//
console.log(fib(6));
console.log(fib(4));
console.log(fib(10));
console.log(fib(50));
