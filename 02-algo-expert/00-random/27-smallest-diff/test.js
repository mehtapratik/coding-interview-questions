// [-1, 5, 10, 20, 28, 3]
// [26, 134, 135, 15, 17]
// -1   3   5  10   20   28
//                       ^
// 15  17  26 134  135 
//                 ^
// sd = 2
// pair 26 28
function smallestDifference(arrayOne, arrayTwo) {
   arrayOne.sort((a, b) => a - b); // n log n
   arrayTwo.sort((a, b) => a - b); // n log n

   let smallestDiff = Infinity;
   let currentDiff = Initnity;
   let smallestPair = [];
   let cursorOne = 0;
   let cursorTwo = 0;

   while (cursorOne < arrayOne.length && cursorTwo < arrayTwo.length) {
      const numOne = arrayOne[cursorOne];
      const numTwo = arrayTwo[cursorTwo];
      currentDiff = Math.abs(numOne - numTwo);
      if (numOne === numTwo) {
         return [numOne, numTwo];
      } else if (numOne < numTwo) {
         cursorOne++;
      } else {
         cursorTwo++;
      }

      if (currentDiff < smallestDiff) {
         smallestDiff = currentDiff;
         smallestPair = [numOne, numTwo];
      }
   }
   return smallestPair;
}