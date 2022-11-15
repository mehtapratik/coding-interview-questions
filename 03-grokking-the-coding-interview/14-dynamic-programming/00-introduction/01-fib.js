// O(2^N)TS
function recursion(n) {
   if (n <= 1) return 0;
   if (n === 2) return 1;

   return recursion(n - 1) + recursion(n - 2);
}

console.log(`Solution with recursion ${recursion(8)}`);

//O(N)TS
function memoization(n) {
   const fibTable = { 1: 0, 2: 1 };

   return fib(n);

   function fib(n) {
      if (n in fibTable) {
         return fibTable[n];
      }

      fibTable[n] = fib(n - 1) + fib(n - 2);

      return fibTable[n];
   }
}

console.log(`Solution with top-down memoization ${memoization(8)}`);

//O(N)TS
function tabulation(n) {
   const fibTable = [0, 1];

   for (let i = 2; i < n; i++) {
      fibTable[i] = fibTable[i - 1] + fibTable[i - 2];
   }

   return fibTable[n - 1];
}

console.log(`Solution with bottom-up tabulation ${tabulation(8)}`);
