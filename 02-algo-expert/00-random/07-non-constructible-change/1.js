// O(N*logN)T
// O(1)
function nonConstructibleChange(coins) {
   coins.sort((a, b) => a - b); //n*logn

   let currentChange = 0;
   for (let coin of coins) { //n
      if ((currentChange + 1) < coin) {
         return currentChange;
      }
      else {
         currentChange += coin;
      }
   }

   return currentChange + 1;
}