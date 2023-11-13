function smallestDifference(arrayOne, arrayTwo) {
   arrayOne.sort((a, b) => a - b);
   arrayTwo.sort((a, b) => a - b);

   let smallestDiff = Infinity;
   let currentDiff = Infinity;
   let smallestPair = [];
   let cursorOne = 0;
   let cursorTwo = 0;

   while (cursorOne < arrayOne.length && cursorTwo < arrayTwo.length) {
      const numOne = arrayOne[cursorOne];
      const numTwo = arrayTwo[cursorTwo];
      const currentDiff = Math.abs(numOne - numTwo);


      if (smallestDiff > currentDiff) {
         smallestDiff = currentDiff;
         smallestPair = [numOne, numTwo];
      }

      if (numOne < numTwo) {
         cursorOne++;
      }
      else if (numTwo < numOne) {
         cursorTwo++;
      }
      else {
         return [numOne, numTwo];
      }
   }

   return smallestPair;
}