// O(N^2)T / O(1)S
function twoNumSum(array, sum) {
   for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
         if (array[i] + array[j] === sum) {
            return [array[i], array[j]];
         }
      }
   }
   return [];
}

