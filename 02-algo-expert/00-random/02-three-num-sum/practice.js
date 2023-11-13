// array = [12, 3, 1, 2, -6, 5, -8, 6]
// sum = 0
// <-| [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]

// Let's say x + y + z = sum
// Sort the array - either in place or creating new instance
// Outer for loop to maintain current x
// Inside the for loop create a runner where start = x + 1 and end = array length
// If x + startNum + endNum = currentSum
// currentSum = sum, add triplets and increment start and decrement end
// currentsum < sum, increment start to move toward target
// currentSum > sum, decrement end to move toward target
function threeNumberSum(array, targetSum) {
   array.sort((a, b) => a - b);

   const triplets = []; // n space
   
   for (let i = 0; i < array.length; i++) { //n time
      const x = array[i];
      let start = i + 1;
      let end = array.length - 1;
      while (start < end) { // n time
         const y = array[start];
         const z = array[end];
         const currentSum = x + y + z;
         if (currentSum === targetSum) {
            triplets.push([x, y, z]);
            start++;
            end--;
         } else if (currentSum < targetSum) {
            start++;
         } else {
            end--;
         }
      }
   }

   return triplets;
} // O(N^2)T | O(N)S