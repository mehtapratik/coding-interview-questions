// Naive - Brute force solution
// O(N^3)T - Because we have three loops
// O(N)S - Because we may end up storing each number combination in triplets array
//         so more or less space complexity will be O(N)
function threeNumberSum(array, targetSum) {
   const triplets = [];
   
   for (let i = 0; i < array.length - 1; i++) {
      const a = array[i];
      for (let j = i + 1; j < array.length; j++) {
         const b = array[j];
         for (let k = j + 1; k < array.length; k++) {
            const c = array[k];
            if ((a + b + c) === targetSum) {
               triplets.push([a, b, c]);
            }
        }
      }
   }

   return triplets;
}