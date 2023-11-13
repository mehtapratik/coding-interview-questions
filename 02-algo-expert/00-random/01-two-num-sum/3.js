// O(N(logN) + N)T - Sorting + Loop
// Therefore O(N(logN))T and O(1)S
function twoNumSum(array, sum) {
   array.sort((a, b) => a - b);

   let start = 0;
   let end = array.length - 1;

   while (start <= end) {
      const x = array[start];
      const y = array[end];
      const currentSum = x + y;
      if (currentSum < sum) {
         start++
      }
      else if (currentSum > sum) {
         end--;
      }
      else {
         return [x, y];
      }
   }

   return [];
}