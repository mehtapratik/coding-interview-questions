//
// COMPLEXITY ANALYSIS
//
// Without memoization -> Each N is doing two calculations (n-1 and n-2). Therefore, time complexity will be O(2^N).
//                        Space complexity will be O(N) for the call stack depth.
// With memoization    -> Each N will be calculated once and only once and then cached. Therefore, both, time and space
//                        complexity will be O(N).
function fib(n, cache = { 1: 1, 2: 1 }) {
   if (n in cache) {
      return cache[n];
   }

   cache[n] = fib(n - 1, cache) + fib(n - 2, cache);
   return cache[n];
}

console.log(fib(50));
