// O(N)T - N is the total number of elements in the array including sub elements.
// O(D)S - D is the greatest depth of the multiplier array
function productSum(array, level = 1) {
   let sum = 0;
   for (let item of array) {
      if (Array.isArray(item)) {
         sum += productSum(item, level + 1);
      }
      else {
         sum += item;
      }
   }
   return sum * level;
}