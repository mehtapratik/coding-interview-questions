// O(N)T - Looping thorugh source once
// O(1)S - We're not taking additional space other than count variable
function isValidSubsequence(source, sequence) {
   let count = 0;
   for (let num of source) {
      if (num === sequence[count]) {
         count++;
         if (count === sequence.length) break;
      }
   }
   return count === sequence.length;
}