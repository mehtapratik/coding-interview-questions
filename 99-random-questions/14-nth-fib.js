let cache = [0, 1];
function nthFib(n) {
   if (n <= 0) {
      return 0;
   }

   if (cache[n]) {
      return cache[n];
   }

   cache[n] = nthFib(n - 2) + nthFib(n - 1);

   return cache[n];
}

console.log(nthFib(15));
console.log(cache);

console.log(nthFib(5));
console.log(cache);
