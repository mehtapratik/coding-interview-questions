// array => [7, 6, 4, -1, 1, 2]
// targetSum => 16
// [7, 6, 4, -1] [7, 6, 1, 2]
// x + y + z (a + b) = targetSum
function fourNumberSum(array, targetSum) {
   const quadruplets = []; // n time
   const remainders = {};
   for (let i = 0; i < array.length; i++) { // n time
      const mainNum = array[i];

      for (let j = i + 1; j < array.length; j++) { // n time
         const x = mainNum;
         const y = array[j];
         const z = targetSum - x - y;
         if (z in remainders) {
            for (let tuple of remainders[z]) { // n time
               quadruplets.push([x, y, tuple[0], tuple[1]]);
            }
         }
      }
      
      for (let k = 0; k < i; k++) { // OR for (let k = i - 1; k >= 0; k--) { // n time
         const a = mainNum;
         const b = array[k];
         const z = a + b;
         if (!remainders[z]) remainders[z] = [];
         remainders[z].push([a, b]);
      }
   }

   return quadruplets;
} // Avg O(N^2)TS | Worst O(N^3)T | O(N^2)S
