// array  = [3, 5, -4, 8, 11, 1, -1, 6]
// sum = 10
// <-| [11, -1]

// Technique 1 - Remainder 
// If x + y = sum Then y (aka remainder)= sum - x
// Store all formerly visited x in hash
// If remainder (y) is in hash then return current number (x) and remainder (y) which equals to desired sum
function twoNumberSum(array, sum) {
   const visited = {};

   for (let x of array) {
      const y = sum - x;
      if (visited[y]) return [x, y];
      visited[x] = true;
   }

   return [];
} // O(N)ST

// Technique 2 - Eliminate O(N)S in above by using runner technique
// Sort the array [-4, -1, 1, 3, 5, 6, 8, 11]
// Compare both ends of array.
// sum of both ends matches? return current number from both ends as result
// sum of both ends smaller than target sum? move the starting cursor forward
// sum of both ends greater than target sum? move the ending cursor backward 
function twoNumberSum(array, sum) {
   array.sort((a, b) => a - b); // n * log n time
   let start = 0;
   let end = array.length - 1;
   while (start < end) { // n time
      const startNum = array[start];
      const endNum = array[end];
      const currentSum = startNum + endNum;
      if (currentSum === sum) {
         return [startNum, endNum];
      } else if (currentSum < sum) {
         start++;
      } else {
         end--;
      }
   }

   return [];
} // O(n * log n)T | O(1)S