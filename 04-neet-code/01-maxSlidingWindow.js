//
// INSTRUCTIONS
//
// You are given an array of integers nums, there is a sliding window of size k which is moving from the very
// left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window
// moves right by one position.

//
// EXAMPLE
// k = 3
//                   s
// nums = 1, 3, -1, -3, 5, 3, 6, 7
/*
output 3
window = 3 -1 -3
max = 3




*/
//
// PREPARATION
//

//
// CODE
//

// function getMax(window) {
//    let max = -Infinity;
//    for (let windowEnd = 0; windowEnd < window.length; windowEnd++) {
//       max = Math.max(max, window[windowEnd]);
//    }

//    return max;
// }
// function maxOfSlidingWindow(nums, k) {
//    const output = [];
//    const window = []; // mimicing deque
//    for (let windowStart = 0; windowStart < nums.length; windowStart++) {
//       window.push(nums[windowStart]);
//       if (window.length === k) {
//          output.push(getMax(window));
//          window.shift();
//       }
//    }

//    return output;
// }

function monotonicDeque(nums, k) {
   const output = [];
   const q = []; // monotonic deque
   for (let i = 0; i < nums.length; i++) {
      while (q.length > 0 && nums[q[q.length - 1]] <= nums[i]) {
         q.pop();
      }

      q.push(i);
      if (q[0] === i - k) {
         q.shift();
      }
      if (i >= k - 1) {
         output.push(nums[q[0]]);
      }
   }

   return output;
}

//
// TEST
//
console.log(monotonicDeque([1, 3, -1, -3, 5, 3, 6, 7], 3));
