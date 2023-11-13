// [ 1, 2, 3, 4, 5, 6] = 13
// [1, 2] + [4+ 6] = 13
// O(N^3)T | O(N^2)S
function fourNumberSum(array, targetSum) {
   array.sort((a, b) => { a - b });

   const tuples = {};
   const matches = [];

   for (let i = 0; i < array.length - 1; i++) {
      const currentNum = array[i];
      for (let j = i + 1; j < array.length; j++) {
         const remainder = targetSum - (currentNum + array[j]);
         if (remainder in tuples) {
            for (let tuple of tuples[remainder]) {
               matches.push([tuple[0], tuple[1], currentNum, array[j]]);
            }
         }
      }

      for (let k = i - 1; k >= 0; k--) {
         const tupleSum = currentNum + array[k];
         if (tupleSum in tuples) {
            tuples[tupleSum].push([currentNum, array[k]]);
         } else {
            tuples[tupleSum] = [[currentNum, array[k]]];
         }
      }
   }

   return matches;
}