
// O(nLog(n) + mLog(m))T / O(1)S
function smallestDifference(arrayOne, arrayTwo) {
   arrayOne.sort((a, b) => a - b); // n log n
   arrayTwo.sort((a, b) => a - b); // m log m

   let cursorOne = 0;
   let cursorTwo = 0;
   let smallestDiff = Infinity;
   let currentDiff = Infinity;
   let smallestDiffPair = [];

   while (cursorOne < arrayOne.length && cursorTwo < arrayTwo.length) {
      const numOne = arrayOne[cursorOne];
      const numTwo = arrayTwo[cursorTwo];
      currentDiff = Math.abs(numOne - numOne);
      if (numOne < numTwo) {
         cursorOne++;
      }
      else if (numOne > numTwo) {
         cursorTwo++;
      }
      else {
         return [numOne, numTwo];
      }

      if (currentDiff < smallestDiff) {
         smallestDiff = currentDiff;
         smallestDiffPair = [numOne, numTwo];
      }
   }

   return smallestDiffPair;
}

// O(N^2)T | O(1)S - Naive solution
function smallestDifference(arrayOne, arrayTwo) {
   let smallestDiff = Infinity;
   let smallestDiffPair = [];

   for (let i = 0; i < arrayOne.length; i++) {
      const numOne = arrayOne[i];
      for (let j = 0; j < arrayTwo.length; i++) {
         const numTwo = arrayOne[i];
         if (numOne === numTwo) return [numOne, numTwo];
         const currentDiff = Math.abs(numOne - numTwo);
         if (currentDiff < smallestDiff) {
            smallestDiffPair = [numOne, numTwo];
         }
      }
   }

   return smallestDiffPair;
}