//
// INSTRUCTIONS
//
// Given a number sequence, find the minimum number of elements that should be deleted to
// make the remaining sequence sorted.
//

//
// EXAMPLE
//
// Input: {4,2,3,6,10,1,12}
// Output: 2
// Explanation: We need to delete {4,1} to make the remaing sequence sorted {2,3,6,10,12}.
//
// Input: {-4,10,3,7,15}
// Output: 1
// Explanation: We need to delete {10} to make the remaing sequence sorted {-4,3,7,15}.
//
// Input: {3,2,1,0}
// Output: 3
// Explanation: Since the elements are in reverse order, we have to delete all except one to get a
// sorted sequence. Sorted sequences are {3}, {2}, {1}, and {0}
//

//
// CODE
//
function minDeletions(sequence) {
   if (Array.isArray(sequence) === false || sequence.length === 0) {
      return 0;
   }

   const cache = {};
   // return recursive(-1, 0);
   // return memoization(-1, 0);
   return tabulation();

   // O(2^n)T | O(n)S
   function recursive(prevIndex, currIndex) {
      if (currIndex >= sequence.length) {
         return 0;
      }

      let option1 = 0;
      if (prevIndex === -1 || sequence[prevIndex] > sequence[currIndex]) {
         option1 =
            (prevIndex === -1 ? 0 : 1) + recursive(currIndex, currIndex + 1);
      }

      const option2 = recursive(prevIndex, currIndex + 1);

      return Math.max(option1, option2);
   }

   // O(n^2)TS
   function memoization(prevIndex, currIndex) {
      const CACHE_KEY = `${prevIndex},${currIndex}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }

      cache[CACHE_KEY] = (() => {
         if (currIndex === sequence.length) {
            return 0;
         }

         let option1 = 0;
         if (prevIndex === -1 || sequence[prevIndex] > sequence[currIndex]) {
            option1 =
               (prevIndex === -1 ? 0 : 1) +
               memoization(currIndex, currIndex + 1);
         }

         const option2 = memoization(prevIndex, currIndex + 1);

         return Math.max(option1, option2);
      })();

      return cache[CACHE_KEY];
   }

   // O(n^2)T | O(n)S
   function tabulation() {
      const table = Array(sequence.length).fill(0);

      let deletionCount = 0;
      for (let i = 1; i < sequence.length; i++) {
         for (let j = 0; j < i; j++) {
            if (sequence[i] < sequence[j] && table[i] <= table[j]) {
               table[i] = 1 + table[j];
            }
         }
         deletionCount = Math.max(deletionCount, table[i]);
      }

      return deletionCount;
   }
}

//
// TEST
//
console.log(minDeletions([4, 2, 3, 6, 10, 1, 12]));
console.log(minDeletions([-4, 10, 3, 9, 7, 15]));
console.log(minDeletions([1, 5, 3, 7]));
console.log(minDeletions([3, 2, 1, 0]));
