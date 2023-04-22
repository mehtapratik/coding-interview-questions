//
// INSTRUCTIONS
//
// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
//
// You must write an algorithm that runs in O(n) time.
//

//
// EXAMPLE
//
// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
//
// Input: nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
// Output: 9;
//

//
// CODE
//
function longestConsecutiveSequence(nums) {
   let longestStreak = 0;
   const hashSet = new Set();

   // initialize hashset
   for (let num of nums) {
      hashSet.add(num);
   }

   // identify longest streak
   for (let num of nums) {
      // was current number part of former streak that's alreaady been measured?
      if (!hashSet.has(num - 1)) {
         let currentStreak = 1;
         let currentNum = num;
         // keep counting and moving to next number until we find entire series
         while (hashSet.has(currentNum + 1)) {
            currentStreak++;
            currentNum++;
         }
         longestStreak = Math.max(currentStreak, longestStreak);
      }
   }

   return longestStreak;
}

//
// TEST
//

console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2]));
console.log(longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));
