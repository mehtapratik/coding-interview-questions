//
// INSTRUCTIONS
//
// Given an array of integers temperatures represents the daily temperatures, return an array
// answer such that answer[i] is the number of days you have to wait after the ith day to get
// a warmer temperature. If there is no future day for which this is possible, keep
// answer[i] == 0 instead.
//

//
// EXAMPLES
//
// Example 1:
// Input: temperatures = [73,74,75,71,69,72,76,73]
// Output: [1,1,4,2,1,1,0,0]
//
// Example 2:
// Input: temperatures = [30,40,50,60]
// Output: [1,1,1,0]
//
// Example 3:
// Input: temperatures = [30,60,90]
// Output: [1,1,0]
//

//
// CODE
//
function solve(temperatures) {
   const answer = new Array(temperatures.length).fill(0);
   let hottestIdx = temperatures.length - 1;

   for (let i = temperatures.length - 1; i >= 0; i--) {
      if (temperatures[hottestIdx] <= temperatures[i]) {
         hottestIdx = i;
         continue;
      }
      for (let j = i; j <= hottestIdx; j++) {
         if (temperatures[j] > temperatures[i]) {
            answer[i] = j - i;
            break;
         }
      }
   }

   return answer;
}

//
// TEST
//
console.log(solve([73, 74, 75, 71, 69, 72, 76, 73]));
console.log(solve([30, 40, 50, 60]));
