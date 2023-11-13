// O(N)ST - Time N for one loop / Space N for hashmap
function twoNumSum(array, sum) {
   // sum = x + y
   // therefore, y (reminder) = sum - x
   const remainders = {};

   for (let num of array) {
      // y = sum - x
      const remainder = sum - num;
      if (num in remainders) {
         return [remainder, num];
      }
      else {
         remainders[remainder] = true;
      }
   }

   return [];
}