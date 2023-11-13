// [5, 7, 1, 1, 2, 3, 22]
// 1 1 2 3 5 7 22

/*
coins =  [5, 7, 1, 1, 2, 3, 22]
         [1, 1, 2, 3, 5, 7, 22]
                ^

         currentChange = 2


*/

function nonConstructibleChange(coins) {
   coins.sort((a, b) => a - b);
   if (Array.isArray(coins) === false) return 1;

   let currentChange = 0;

   for (let coin of coins) {
      if (coin > (currentChange + 1)) return currentChange + 1;
      currentChange += coin;
   }

   return currentChange + 1;
}