// O(N^2)T -   Since we're running two loops -
//             One for loop and second while loop and both could run
//             up to N times of array size
// O(N)        Because we may end up storing each number combination in triplets array
//             so more or less space complexity will be O(N)
function threeNumberSum(array, targetSum) {
   array.sort((a, b) => a - b);
   
   const triplets = [];

   for (let i = 0; i < array.length - 1; i++) {
      const x = array[i];
      let start = i + 1;
      let end = array.length - 1;
      while (start < end) {
         const y = array[start];
         const z = array[end];
         const currentSum = x + y + z;
         if (currentSum < targetSum) {
            start++;
         }
         else if (currentSum > targetSum) {
            end--;
         }
         else {
            triplets.push([x, y, z]);
            start++;
            end--;
         }
      }
   }

   return triplets;
}